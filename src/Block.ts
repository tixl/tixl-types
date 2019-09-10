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
  payload: EncryptedString;
  amountCommitment: string;
  balanceCommitment: string;
  amountRangeProof: string;
  balanceRangeProof: string;
  receiverAmount: EncryptedNumber;
  receiverBlindingFactorAmount: EncryptedString;
  senderBlindingFactorBalance: EncryptedString;
  senderBalance: EncryptedNumber;
  senderAmount: EncryptedNumber;

  getDataForSignature(): SignatureData;
  isValid(): boolean;
  setAmount(publicKey: string, amount: number, balance: number, prev: Block): void;
  verifyCommitments(prev: Block): boolean;
  verifySignature(accountOwnersPublicKey: string): boolean;
  encrypt(): Promise<void>;
  decrypt(): Promise<void>;
};
