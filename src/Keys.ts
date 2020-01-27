export type NTRUPrivateKey = string;
export type NTRUPublicKey = string;
export type SigPublicKey = string;
export type SigPrivateKey = string;
export type AESPrivateKey = string;

export type KeySet = {
  aes: AESPrivateKey;
  sig: {
    privateKey: SigPrivateKey;
    publicKey: SigPublicKey;
  };
  ntru: {
    private: NTRUPrivateKey;
    public: NTRUPublicKey;
  };
};
