import { Buffer } from 'buffer';

/**
 * Cross platform interface to implement crypto related functions.
 */
export interface Crypto {
  randomBytes(length: number): Buffer;
  sha256(message: string): string;
  base58: {
    toBytes(payload: string): Buffer;
    toString(payload: Buffer): string;
  };
  secp256k1: {
    verify(message: Buffer, signature: Buffer, publicKey: Buffer): boolean;
    sign(message: Buffer, privateKey: Buffer): Buffer;
    verifyPrivateKey(privateKey: Buffer): boolean;
    createPublicKey(privateKey: Buffer): Buffer;
  };
}
