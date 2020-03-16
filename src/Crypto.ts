/**
 * Cross platform interface to implement crypto related functions.
 *
 * TODO: Maybe replace 'any' with generics as Crypto<T> so that
 * nodejs implementations can use Crypto<Buffer> and browser-utils
 * can use Crypto<UInt8Array>.
 */
export interface Crypto {
  randomBytes: (length: number) => any;
  secp256k1: {
    commit: (bf: any, amount: string) => any;
    blindSum: (bfs: any[], mode: number) => any;
    rangeProofSign: (
      minValue: number,
      commitment: any,
      commitBlind: any,
      nonce: any,
      base10Exp: number,
      minBits: number,
      actualValue: string,
    ) => any;
  };
  aes: {
    encrypt: (payload: string | String, key: any) => Promise<string>;
    decrypt: (payload: string | String, key: any) => Promise<string>;
  };
  ntru: {
    keyPair: (seed: any) => Promise<any>;
    encrypt: (payload: string | String, key: any) => Promise<string>;
    decrypt: (payload: string | String, key: any) => Promise<string>;
  };
  base64: {
    toBytes: (payload: string | String) => any;
    toString: (payload: any) => string;
  };
}
