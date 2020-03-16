export class NTRUPrivateKey extends String {}
export class NTRUPublicKey extends String {}
export class SigPublicKey extends String {}
export class SigPrivateKey extends String {}
export class AESPrivateKey extends String {}

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
