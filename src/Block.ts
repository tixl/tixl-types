import { StorageId } from './Storage';

export type EncryptedNumber = string;
export type EncryptedString = string;

export class Signature extends String {}

export type SignatureData = {
  type: string;
  prev: Signature | undefined;
  senderBalance: string;
  senderAmount: string;
  refBlock: Signature | undefined;
  refAsset: string | undefined;
  claimSignature: string | undefined;
  payload: string | undefined;
};

export enum BlockType {
  OPENING = 'OPENING',
  RECEIVE = 'RECEIVE',
  SEND = 'SEND',
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  ASSET = 'ASSET',
}

export class Block {
  id: StorageId;
  chainId: StorageId;
  txId: string;
  signature: Signature;
  type: BlockType;
  prev: Signature | undefined;
  refBlock: Signature | undefined;
  refAsset: string | undefined;
  claimSignature: string | undefined;
  payload: string | undefined;
  createdAt: number;
  senderBalance: EncryptedNumber;
  senderAmount: EncryptedNumber;

  state?: string;

  getDataForSignature(): SignatureData {
    const { type, prev, senderBalance, senderAmount, refBlock, refAsset, claimSignature, payload } = this;

    return {
      type,
      prev,
      senderBalance,
      senderAmount,
      refBlock,
      refAsset,
      claimSignature,
      payload,
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
  }
}

export function fromBlockObject(obj: any) {
  const block = new Block();

  block.signature = obj.signature;
  block.type = obj.type;
  block.prev = obj.prev;
  block.refBlock = obj.refBlock;
  block.refAsset = obj.refAsset;
  block.claimSignature = obj.claimSignature;
  block.createdAt = obj.createdAt;
  block.senderBalance = obj.senderBalance;
  block.senderAmount = obj.senderAmount;
  block.state = obj.state;
  block.payload = obj.payload;

  return block;
}

export type BlockValues = {
  amount: string | number | bigint;
  balance: string | number | bigint;
};

export function isBlock(val: any): boolean {
  if (!val) return false;

  // Ducktyping: maybe extend check with more fields
  if (!val.type) return false;
  if (!val.senderAmount) return false;

  return true;
}
