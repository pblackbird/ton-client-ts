export declare type SigningBoxHandle = number;
export declare type ParamsOfFactorize = {
    /**
     * composite - Hexadecimal representation of u64 composite number.
     */
    composite: string;
};
export declare type ResultOfFactorize = {
    /**
     * factors - Two factors of composite or empty if composite can't be factorized.
     */
    factors: string[];
};
export declare type ParamsOfModularPower = {
    /**
     * base - `base` argument of calculation.
     */
    base: string;
    /**
     * exponent - `exponent` argument of calculation.
     */
    exponent: string;
    /**
     * modulus - `modulus` argument of calculation.
     */
    modulus: string;
};
export declare type ResultOfModularPower = {
    /**
     * modular_power - Result of modular exponentiation
     */
    modular_power: string;
};
export declare type ParamsOfTonCrc16 = {
    /**
     * data - Input data for CRC calculation. Encoded with `base64`.
     */
    data: string;
};
export declare type ResultOfTonCrc16 = {
    /**
     * crc - Calculated CRC for input data.
     */
    crc: number;
};
export declare type ParamsOfGenerateRandomBytes = {
    /**
     * length - Size of random byte array.
     */
    length: number;
};
export declare type ResultOfGenerateRandomBytes = {
    /**
     * bytes - Generated bytes encoded in `base64`.
     */
    bytes: string;
};
export declare type ParamsOfConvertPublicKeyToTonSafeFormat = {
    /**
     * public_key - Public key - 64 symbols hex string
     */
    public_key: string;
};
export declare type ResultOfConvertPublicKeyToTonSafeFormat = {
    /**
     * ton_public_key - Public key represented in TON safe format.
     */
    ton_public_key: string;
};
export declare type KeyPair = {
    /**
     * public - Public key - 64 symbols hex string
     */
    public: string;
    /**
     * secret - Private key - u64 symbols hex string
     */
    secret: string;
};
export declare type ParamsOfSign = {
    /**
     * unsigned - Data that must be signed encoded in `base64`.
     */
    unsigned: string;
    keys: KeyPair;
};
export declare type ResultOfSign = {
    /**
     * signed - Signed data combined with signature encoded in `base64`.
     */
    signed: string;
    /**
     * signature - Signature encoded in `hex`.
     */
    signature: string;
};
export declare type ParamsOfVerifySignature = {
    /**
     * signed - Signed data that must be verified encoded in `base64`.
     */
    signed: string;
    /**
     * public - Signer's public key - 64 symbols hex string
     */
    public: string;
};
export declare type ResultOfVerifySignature = {
    /**
     * unsigned - Unsigned data encoded in `base64`.
     */
    unsigned: string;
};
export declare type ParamsOfHash = {
    /**
     * data - Input data for hash calculation. Encoded with `base64`.
     */
    data: string;
};
export declare type ResultOfHash = {
    /**
     * hash - Hash of input `data`. Encoded with 'hex'.
     */
    hash: string;
};
export declare type ParamsOfScrypt = {
    /**
     * password - The password bytes to be hashed.
     */
    password: string;
    /**
     * salt - A salt bytes that modifies the hash to protect against Rainbow table attacks.
     */
    salt: string;
    /**
     * log_n - CPU/memory cost parameter
     */
    log_n: number;
    /**
     * r - The block size parameter, which fine-tunes sequential memory read size and performance.
     */
    r: number;
    /**
     * p - Parallelization parameter.
     */
    p: number;
    /**
     * dk_len - Intended output length in octets of the derived key.
     */
    dk_len: number;
};
export declare type ResultOfScrypt = {
    /**
     * key - Derived key. Encoded with `hex`.
     */
    key: string;
};
export declare type ParamsOfNaclSignKeyPairFromSecret = {
    /**
     * secret - Secret key - unprefixed 0-padded to 64 symbols hex string
     */
    secret: string;
};
export declare type ParamsOfNaclSign = {
    /**
     * unsigned - Data that must be signed encoded in `base64`.
     */
    unsigned: string;
    /**
     * secret - Signer's secret key - unprefixed 0-padded to 64 symbols hex string
     */
    secret: string;
};
export declare type ResultOfNaclSign = {
    /**
     * signed - Signed data, encoded in `base64`.
     */
    signed: string;
};
export declare type ParamsOfNaclSignOpen = {
    /**
     * signed - Signed data that must be unsigned. Encoded with `base64`.
     */
    signed: string;
    /**
     * public - Signer's public key - unprefixed 0-padded to 64 symbols hex string
     */
    public: string;
};
export declare type ResultOfNaclSignOpen = {
    /**
     * unsigned - Unsigned data, encoded in `base64`.
     */
    unsigned: string;
};
export declare type ResultOfNaclSignDetached = {
    /**
     * signature - Signature encoded in `hex`.
     */
    signature: string;
};
export declare type ParamsOfNaclBoxKeyPairFromSecret = {
    /**
     * secret - Secret key - unprefixed 0-padded to 64 symbols hex string
     */
    secret: string;
};
export declare type ParamsOfNaclBox = {
    /**
     * decrypted - Data that must be encrypted encoded in `base64`.
     */
    decrypted: string;
    /**
     * nonce - Nonce, encoded in `hex`
     */
    nonce: string;
    /**
     * their_public - Receiver's public key - unprefixed 0-padded to 64 symbols hex string
     */
    their_public: string;
    /**
     * secret - Sender's private key - unprefixed 0-padded to 64 symbols hex string
     */
    secret: string;
};
export declare type ResultOfNaclBox = {
    /**
     * encrypted - Encrypted data encoded in `base64`.
     */
    encrypted: string;
};
export declare type ParamsOfNaclBoxOpen = {
    /**
     * encrypted - Data that must be decrypted. Encoded with `base64`.
     */
    encrypted: string;
    nonce: string;
    /**
     * their_public - Sender's public key - unprefixed 0-padded to 64 symbols hex string
     */
    their_public: string;
    /**
     * secret - Receiver's private key - unprefixed 0-padded to 64 symbols hex string
     */
    secret: string;
};
export declare type ResultOfNaclBoxOpen = {
    /**
     * decrypted - Decrypted data encoded in `base64`.
     */
    decrypted: string;
};
export declare type ParamsOfNaclSecretBox = {
    /**
     * decrypted - Data that must be encrypted. Encoded with `base64`.
     */
    decrypted: string;
    /**
     * nonce - Nonce in `hex`
     */
    nonce: string;
    /**
     * key - Secret key - unprefixed 0-padded to 64 symbols hex string
     */
    key: string;
};
export declare type ParamsOfNaclSecretBoxOpen = {
    /**
     * encrypted - Data that must be decrypted. Encoded with `base64`.
     */
    encrypted: string;
    /**
     * nonce - Nonce in `hex`
     */
    nonce: string;
    /**
     * key - Public key - unprefixed 0-padded to 64 symbols hex string
     */
    key: string;
};
export declare type ParamsOfMnemonicWords = {
    /**
     * dictionary - Dictionary identifier
     */
    dictionary?: number;
};
export declare type ResultOfMnemonicWords = {
    /**
     * words - The list of mnemonic words
     */
    words: string;
};
export declare type ParamsOfMnemonicFromRandom = {
    /**
     * dictionary - Dictionary identifier
     */
    dictionary?: number;
    /**
     * word_count - Mnemonic word count
     */
    word_count?: number;
};
export declare type ResultOfMnemonicFromRandom = {
    /**
     * phrase - String of mnemonic words
     */
    phrase: string;
};
export declare type ParamsOfMnemonicFromEntropy = {
    /**
     * entropy - Entropy bytes. Hex encoded.
     */
    entropy: string;
    /**
     * dictionary - Dictionary identifier
     */
    dictionary?: number;
    /**
     * word_count - Mnemonic word count
     */
    word_count?: number;
};
export declare type ResultOfMnemonicFromEntropy = {
    /**
     * phrase - Phrase
     */
    phrase: string;
};
export declare type ParamsOfMnemonicVerify = {
    /**
     * phrase - Phrase
     */
    phrase: string;
    /**
     * dictionary - Dictionary identifier
     */
    dictionary?: number;
    /**
     * word_count - Word count
     */
    word_count?: number;
};
export declare type ResultOfMnemonicVerify = {
    /**
     * valid - Flag indicating the mnemonic is valid or not
     */
    valid: boolean;
};
export declare type ParamsOfMnemonicDeriveSignKeys = {
    /**
     * phrase - Phrase
     */
    phrase: string;
    /**
     * path - Derivation path, for instance "m/44'/396'/0'/0/0"
     */
    path?: string;
    /**
     * dictionary - Dictionary identifier
     */
    dictionary?: number;
    /**
     * word_count - Word count
     */
    word_count?: number;
};
export declare type ParamsOfHDKeyXPrvFromMnemonic = {
    /**
     * phrase - String with seed phrase
     */
    phrase: string;
    /**
     * dictionary - Dictionary identifier
     */
    dictionary?: number;
    /**
     * word_count - Mnemonic word count
     */
    word_count?: number;
};
export declare type ResultOfHDKeyXPrvFromMnemonic = {
    /**
     * xprv - Serialized extended master private key
     */
    xprv: string;
};
export declare type ParamsOfHDKeyDeriveFromXPrv = {
    /**
     * xprv - Serialized extended private key
     */
    xprv: string;
    /**
     * child_index - Child index (see BIP-0032)
     */
    child_index: number;
    /**
     * hardened - Indicates the derivation of hardened/not-hardened key (see BIP-0032)
     */
    hardened: boolean;
};
export declare type ResultOfHDKeyDeriveFromXPrv = {
    /**
     * xprv - Serialized extended private key
     */
    xprv: string;
};
export declare type ParamsOfHDKeyDeriveFromXPrvPath = {
    /**
     * xprv - Serialized extended private key
     */
    xprv: string;
    /**
     * path - Derivation path, for instance "m/44'/396'/0'/0/0"
     */
    path: string;
};
export declare type ResultOfHDKeyDeriveFromXPrvPath = {
    /**
     * xprv - Derived serialized extended private key
     */
    xprv: string;
};
export declare type ParamsOfHDKeySecretFromXPrv = {
    /**
     * xprv - Serialized extended private key
     */
    xprv: string;
};
export declare type ResultOfHDKeySecretFromXPrv = {
    /**
     * secret - Private key - 64 symbols hex string
     */
    secret: string;
};
export declare type ParamsOfHDKeyPublicFromXPrv = {
    /**
     * xprv - Serialized extended private key
     */
    xprv: string;
};
export declare type ResultOfHDKeyPublicFromXPrv = {
    /**
     * public - Public key - 64 symbols hex string
     */
    public: string;
};
export declare type ParamsOfChaCha20 = {
    /**
     * data - Source data to be encrypted or decrypted. Must be encoded with `base64`.
     */
    data: string;
    /**
     * key - 256-bit key. Must be encoded with `hex`.
     */
    key: string;
    /**
     * nonce - 96-bit nonce. Must be encoded with `hex`.
     */
    nonce: string;
};
export declare type ResultOfChaCha20 = {
    /**
     * data - Encrypted/decrypted data. Encoded with `base64`.
     */
    data: string;
};