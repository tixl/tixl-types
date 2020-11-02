export class SigPublicKey extends String {}
export class SigPrivateKey extends String {}

export type KeySet = {
  sig: {
    privateKey: SigPrivateKey;
    publicKey: SigPublicKey;
  };
};
