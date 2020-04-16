import { Block, fromBlockObject, BlockType } from './Block';
import { SigPublicKey, NTRUPublicKey } from './Keys';
import { StorageId } from './Storage';

export enum AssetSymbol {
  TXL = 'TXL',
  BTC = 'BTC',
}

export class Blockchain {
  id: StorageId;
  leafId: StorageId | undefined;
  publicSig: SigPublicKey;
  publicNtru: NTRUPublicKey | undefined;
  assetSymbol: AssetSymbol;
  blocks: Block[] = [];

  constructor(publicSig: SigPublicKey, publicNtru?: NTRUPublicKey, symbol?: AssetSymbol) {
    this.publicSig = publicSig;
    this.publicNtru = publicNtru;
    this.assetSymbol = symbol || AssetSymbol.TXL;
  }

  addBlock(block: Block): void {
    this.blocks.push(block);
  }

  leaf(): Block | undefined {
    const prevs = this.blocks.map(block => block.prev).filter(prev => !!prev);
    return this.blocks.find(block => prevs.indexOf(block.signature) === -1);
  }

  openingBlock(): Block | undefined {
    if (!Array.isArray(this.blocks)) {
      return;
    }

    return this.blocks.filter(block => block.type === BlockType.OPENING && !block.prev).pop();
  }
}

export function fromBlockchainObject(obj: any) {
  const chain = new Blockchain(obj.publicSig, obj.publicNtru, obj.assetSymbol);
  chain.blocks = obj.blocks.map(deserializeBlock);

  return chain;
}

export function deserializeBlock(block: object): Block {
  return fromBlockObject(block);
}

export function isBlockchain(val: any): boolean {
  if (!val) return false;

  // Ducktyping: maybe extend check with more fields
  return Array.isArray(val.blocks);
}

export function isBlockchainRecord(val: any): boolean {
  if (!val) return false;

  const fields = Object.getOwnPropertyNames(val);

  // an empty record is a valid record..
  if (fields.length === 0) return true;

  // test the first object if it is a blockchain
  // if so the val behaves like a Record<string, Blockchain>
  const testFirstChain = fields[0];

  return isBlockchain(val[testFirstChain]);
}
