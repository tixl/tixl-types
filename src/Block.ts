import { StorageId } from './Storage';
import { NTRUPublicKey } from './Keys';

export type EncryptedNumber = string;
export type EncryptedString = string;

export class Signature extends String {}

export type SignatureData = {
  type: string;
  prev: Signature | undefined;
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
  refBlock: Signature | undefined;
  refAsset: string | undefined;
  claimSignature: string | undefined;
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
  signature: Signature;
  type: BlockType;
  prev: Signature | undefined;
  payload: string;
  refBlock: Signature | undefined;
  refAsset: string | undefined;
  claimSignature: string | undefined;
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

  state?: string;

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
      refBlock,
      refAsset,
      claimSignature,
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
      refBlock,
      refAsset,
      claimSignature,
    };
  }

  setAmount(amount: string | number | bigint, balance: string | number | bigint, prev?: Block) {
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

    this.senderAmount = amount.toString();
    this.senderBalance = balance.toString();

    if (prev) {
      this.prev = prev.signature;
    }

    if (this.type === BlockType.SEND) {
      this.receiverAmount = amount.toString();
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
  block.refAsset = obj.refAsset;
  block.claimSignature = obj.claimSignature;
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
  block.state = obj.state;

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

export function isBlock(val: any): boolean {
  if (!val) return false;

  // Ducktyping: maybe extend check with more fields
  if (!val.type) return false;
  if (!val.senderAmount) return false;

  return true;
}
