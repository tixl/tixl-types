import { AssetSymbol } from './Blockchain';
import { SigPublicKey } from './Keys';
import { StorageId } from './Storage';

export class Signature extends String {}

export type SignatureData = {
  type: string;
  prev: Signature | undefined;
  symbol: AssetSymbol | undefined;
  senderBalance: string;
  senderAmount: string;
  refBlock: Signature | undefined;
  refAsset: string | undefined;
  refAddress: SigPublicKey | undefined;
  claimSignature: string | undefined;
  payload: string | undefined;
  feeAmount: string | undefined;
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
  // ledger level
  id: StorageId;
  chainId: StorageId;
  txId: string;

  // common fields
  signature: Signature;
  type: BlockType;
  symbol: AssetSymbol | undefined;
  prev: Signature | undefined;
  refBlock: Signature | undefined;
  refAsset: string | undefined;
  refAddress: SigPublicKey | undefined;
  claimSignature: string | undefined;
  payload: string | undefined;
  createdAt: number;
  senderBalance: string;
  senderAmount: string;
  feeAmount: string | undefined;

  // used mostly on wallet level
  nonce: number[] | undefined;
  state: string | undefined;

  getDataForSignature(): SignatureData {
    const {
      type,
      prev,
      symbol,
      senderBalance,
      senderAmount,
      refBlock,
      refAsset,
      refAddress,
      claimSignature,
      payload,
      feeAmount,
    } = this;

    return {
      type,
      prev,
      symbol,
      senderBalance,
      senderAmount,
      refBlock,
      refAsset,
      refAddress,
      claimSignature,
      payload,
      feeAmount,
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
  block.symbol = obj.symbol;
  block.refBlock = obj.refBlock;
  block.refAsset = obj.refAsset;
  block.refAddress = obj.refAddress;
  block.claimSignature = obj.claimSignature;
  block.createdAt = obj.createdAt;
  block.senderBalance = obj.senderBalance;
  block.senderAmount = obj.senderAmount;
  block.state = obj.state;
  block.payload = obj.payload;
  block.nonce = obj.nonce;
  block.feeAmount = obj.feeAmount;

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
