import { buildApiType, entityTemplate, methodTemplate } from "./builders";
import { findDefinitions } from "./utils";
import fs from "fs";
import rimraf from "rimraf";

export class ApiFreetonBuilder {
  types: any[] = [];
  functions: any[] = [];
  modules: any[] = [];

  constructor(private config: {}) { }

  setApiDescription(api: any) {
    for (const module of api.modules) {
      this.modules = [
        ...this.modules,
        {
          name: module.name,
          summary: module.summary,
          description: module.description,
        },
      ];

      for (const apiType of module.types) {
        this.types = [...this.types, { ...apiType, module: module.name }];
      }
      for (const apiFunction of module.functions) {
        this.functions = [...this.functions, { ...apiFunction, module: module.name }];
      }
    }
  }

  prepareDepedencies() {
    for (const apiType of this.types) {
      apiType.definitions = findDefinitions(apiType, this.types).reduce(
        (acc, memo) => ({ ...acc, [memo.name]: memo }),
        {}
      );
    }
    for (const apiFunction of this.functions) {
      apiFunction.definitions = findDefinitions(apiFunction, this.types).reduce(
        (acc, memo) => ({ ...acc, [memo.name]: memo }),
        {}
      );
    }
    for (const module of this.modules) {
      const filteredTypes = this.types
        .filter((apiType) => apiType.module === module.name)
        .map((apiType) => apiType.definitions);

      const filteredFunctions = this.functions
        .filter((apiType) => apiType.module === module.name)
        .map((apiType) => apiType.definitions);

      module.typeDepedencies = filteredTypes.reduce((acc, memo) => {
        return {
          ...acc,
          ...Object.entries(memo)
            .filter(([key, value]: [string, any]) => value.module !== module.name)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
        };
      }, {});

      module.functionDepedencies = filteredFunctions.reduce((acc, memo) => {
        return {
          ...acc,
          ...memo,
        };
      }, {});
    }
  }

  prepareBuild() {
    for (const apiType of this.types) {
      const { source, description } = buildApiType(apiType);
      apiType.source = source;
      apiType.formattedDescription = description;
    }

    for (const apiType of this.functions) {
      const { source, description } = methodTemplate(apiType);
      apiType.source = source;
      apiType.formattedDescription = description;
    }

    for (const module of this.modules) {
      module.source = entityTemplate(module);
    }
  }

  build() {
    const dir = "../src/modules";

    rimraf.sync(`${dir}`);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    for (const module of this.modules) {
      const moduleDir = dir + "/" + module.name;
      if (!fs.existsSync(moduleDir)) {
        fs.mkdirSync(moduleDir);
      }

      const typesSource = this.types
        .filter((apiType) => apiType.module === module.name)
        .map(
          (apiType) =>
            `${apiType.formattedDescription && apiType.formattedDescription.trim()
              ? `/**\n${apiType.formattedDescription}\n*/`
              : ""
            } ${apiType.source}`
        )
        .join("\n");

      const typeDepedency = Object.values(module.typeDepedencies).reduce((acc, memo: any) => {
        if (!acc[memo.module]) {
          acc[memo.module] = new Set();
        }

        acc[memo.module].add(memo.name);

        return acc;
      }, {});

      const typeDepencySource = Object.entries(typeDepedency).reduce((acc, [key, value]) => {
        return `${acc}import { ${Array.from(value).join(", ")} } from '../${key}/types';\n`;
      }, "");

      const functionsDepedency = Object.values(module.functionDepedencies).reduce((acc, memo: any) => {
        if (!acc[memo.module]) {
          acc[memo.module] = new Set();
        }

        acc[memo.module].add(memo.name);

        return acc;
      }, {});

      const functionsDepedencySource = Object.entries(functionsDepedency).reduce((acc, [key, value]) => {
        if (key === 'custom') {
          const imports = acc.split('\n');
          imports[0] = `import { TonClient, ${Array.from(value).join(", ")} } from "../..";`;
          return imports.join('\n')
        }
        return `${acc}import { \n${Array.from(value).join(",\n")}\n } from './types';\n`;
      }, 'import { TonClient } from "../..";\n');

      const functionsSource = this.functions
        .filter((apiType) => apiType.module === module.name)
        .map((apiType) => `${apiType.formattedDescription} ${apiType.source}`)
        .join("\n");

      const moduleSource = module.source(functionsSource);

      fs.writeFileSync(`${moduleDir}/types.ts`, `${typeDepencySource}${typesSource}`);
      fs.writeFileSync(`${moduleDir}/index.ts`, `${functionsDepedencySource}${moduleSource}`);
    }
  }
}
