/**
 * Cross platform interface to implement crypto related functions.
 *
 * TODO: Maybe replace 'any' with generics as Crypto<T> so that
 * nodejs implementations can use Crypto<Buffer> and browser-utils
 * can use Crypto<UInt8Array>.
 */
export interface Crypto {
  randomBytes: (length: number) => any;
  base64: {
    toBytes: (payload: string | String) => any;
    toString: (payload: any) => string;
  };
}
