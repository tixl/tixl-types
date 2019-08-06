import { EncryptedNumber, EncryptedString } from './Block';

export type Transaction = {
  amount: EncryptedNumber;
  description: EncryptedString;
  receiverPublicAddress: EncryptedString;
  stealthchainAddress: string;

  affectsMe(privateKey: string): boolean
  decrypt(privateKey: string): any
}
