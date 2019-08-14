import { Transaction } from './Transaction';
import { StorageId } from './Blockchain';

export type EncryptedNumber = string;
export type EncryptedString = string;
export type Signature = string;
export type SignatureData = {};

export enum BlockType {
  OPENING = 'OPENING',
  RECEIVE = 'RECEIVE',
  SEND = 'SEND',
}

export type Block = {
  id: StorageId;
  chainId: StorageId;
  signature: Signature;
  type: BlockType;
  prev: Signature | null;
  work: string;
  transaction: Transaction;
  amountCommitment: string;
  balanceCommitment: string;
  receiverAmount: EncryptedNumber;
  receiverBlindingFactorAmount: EncryptedString;
  senderBlindingFactorBalance: EncryptedString;
  senderBalance: EncryptedNumber;
  senderAmount: EncryptedNumber;

  getDataForSignature(): SignatureData;
  isValid(): boolean;
  setAmount(publicKey: string, amount: number): Block;
  setBalance(publicKey: string, balance: number): Block;
  validateCommitment(): boolean;
  verifySignature(accountOwnersPublicKey: string): boolean;
  clone(): Block;
};
