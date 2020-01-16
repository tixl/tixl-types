import { StorageId } from './Blockchain';
import { NTRUPublicKey } from './Keys';

export type EncryptedNumber = string;
export type EncryptedString = string;
export type Signature = string;
export type SignatureData = {
  type: string;
  prev: string | undefined;
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
  prev: Signature | undefined;
  payload: EncryptedString;
  refBlock: Signature | undefined;
  createdAt: number;
  amountCommitment: string;
  balanceCommitment: string;
  amountRangeProof: string;
  balanceRangeProof: string;
  receiverAmount: EncryptedNumber;
  receiverBlindingFactorAmount: EncryptedString;
  senderBlindingFactorBalance: EncryptedString;
  senderBalance: EncryptedNumber;
  senderAmount: EncryptedNumber;
  publicNtruKey: NTRUPublicKey | undefined;

  getDataForSignature(): SignatureData;
  setAmount(amount: string | number | bigint, balance: string | number | bigint, prev?: Block, ref?: Block): void;
};
