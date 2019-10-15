import { StorageId } from './Blockchain';

export type EncryptedNumber = string;
export type EncryptedString = string;
export type Signature = string;
export type SignatureData = {
  type: string;
  prev: string | null;
  payload: string;
  amountCommitment: string;
  balanceCommitment: string;
  amountRangeProof: string;
  balanceRangeProof: string;
  receiverAmount: string;
  receiverBlindingFactorAmount: string;
  senderBlindingFactorBalance: string;
  senderBalance: string;
  senderAmount: string;
};

export enum BlockType {
  OPENING = 'OPENING',
  RECEIVE = 'RECEIVE',
  SEND = 'SEND',
}

export type Block = {
  id: StorageId;
  chainId: StorageId;
  txId: StorageId;
  signature: Signature;
  type: BlockType;
  prev: Signature | null;
  payload: EncryptedString;
  refBlock: Signature | null;
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
  setAmount(amount: string | number | bigint, balance: string | number | bigint, prev?: Block, ref?: Block): void;
};
