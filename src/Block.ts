import { StorageId } from './Storage';
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
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}

export class Block {
  id: StorageId;
  chainId: StorageId;
  txId: string;
  signature: string;
  type: BlockType;
  prev: string | undefined;
  payload: string;
  refBlock: string | undefined;
  refAsset: string | undefined;
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

  getDataForSignature(): SignatureData {
    const {
      type,
      prev,
      payload,
      amountCommitment,
      balanceCommitment,
      amountRangeProof,
      balanceRangeProof,
      receiverAmount,
      receiverBlindingFactorAmount,
      senderBlindingFactorBalance,
      senderBalance,
      senderAmount,
    } = this;

    return {
      type,
      prev,
      payload,
      amountCommitment,
      balanceCommitment,
      amountRangeProof,
      balanceRangeProof,
      receiverAmount,
      receiverBlindingFactorAmount,
      senderBlindingFactorBalance,
      senderBalance,
      senderAmount,
    };
  }

  setAmount(amount: string | number | bigint, balance: string | number | bigint, prev?: Block, ref?: Block) {
    if (typeof amount === 'string' && amount.indexOf('.') >= 0) {
      console.error('There may be an issue with the amount fraction on the caller side (see Ledger.TIXL_DIVISOR).');
      throw new Error('Decimals as the amount are not allowed on a block.');
    }

    if (typeof amount === 'number' && amount > Number.MAX_SAFE_INTEGER) {
      console.error('There may be an issue with the amount fraction on the caller side (see Ledger.TIXL_DIVISOR).');
      throw new Error('Amount is too big. Please use the bigint type.');
    }

    if (typeof balance === 'string' && balance.indexOf('.') >= 0) {
      console.error('There may be an issue with the amount fraction on the caller side (see Ledger.TIXL_DIVISOR).');
      throw new Error('Decimals as the balance are not allowed on a block.');
    }

    if (typeof balance === 'number' && balance > Number.MAX_SAFE_INTEGER) {
      console.error('There may be an issue with the amount fraction on the caller side (see Ledger.TIXL_DIVISOR).');
      throw new Error('Balance is too big. Please use the bigint type.');
    }

    this.receiverAmount = amount.toString();
    this.senderAmount = amount.toString();
    this.senderBalance = balance.toString();

    if (prev) {
      this.prev = prev.signature;
    }
  }
}

export function fromBlockObject(obj: any) {
  const block = new Block();

  block.signature = obj.signature;
  block.type = obj.type;
  block.prev = obj.prev;
  block.payload = obj.payload;
  block.refBlock = obj.refBlock;
  block.createdAt = obj.createdAt;
  block.amountCommitment = obj.amountCommitment;
  block.balanceCommitment = obj.balanceCommitment;
  block.amountRangeProof = obj.amountRangeProof;
  block.balanceRangeProof = obj.balanceRangeProof;
  block.receiverAmount = obj.receiverAmount;
  block.receiverBlindingFactorAmount = obj.receiverBlindingFactorAmount;
  block.senderBlindingFactorBalance = obj.senderBlindingFactorBalance;
  block.senderBalance = obj.senderBalance;
  block.senderAmount = obj.senderAmount;
  block.publicNtruKey = obj.publicNtruKey;

  return block;
}

export type CommitmentData = {
  type: string;
  amount: string | number | bigint;
  balance: string | number | bigint;
};

export type BlockValues = {
  amount: string | number | bigint;
  balance: string | number | bigint;
};

export type BlockCommitments = {
  balanceCommitment: any;
  amountCommitment: any;
  amountRangeProof: any;
  balanceRangeProof: any;
  balanceCommitmentBlindFactor: any;
  amountCommitmentBlindFactor: any;
};
