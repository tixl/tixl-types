import { Block, fromBlockObject, BlockType } from './Block';
import { SigPublicKey } from './Keys';
import { StorageId } from './Storage';

export enum AssetSymbol {
  TXL = 'TXL',
  BTC = 'BTC',
  ETH = 'ETH',
}

export class Blockchain {
  id: StorageId;
  leafId: StorageId | undefined;
  publicSig: SigPublicKey;
  blocks: Block[] = [];

  constructor(publicSig: SigPublicKey) {
    this.publicSig = publicSig;
  }

  addBlock(block: Block): void {
    this.blocks.push(block);
  }

  leaf(): Block | undefined {
    const prevIndex: Record<string, Block> = {};

    // index points to next blocks
    // you can look up which blocks points to a signature
    this.blocks.forEach((block) => {
      // only interested in asset blocks
      if (block.type !== BlockType.ASSET) return;

      prevIndex[block.prev as string] = block;
    });

    const anyAssetBlock = this.blocks.find((block) => block.type === BlockType.ASSET);

    if (!anyAssetBlock) {
      // chains without assets block may have just one or zero blocks
      return this.blocks[0];
    }

    return recursiveLeaf(prevIndex, anyAssetBlock);
  }

  leafAsset(asset: AssetSymbol): Block | undefined {
    const prevIndex: Record<string, Block> = {};

    // index points to next blocks
    // you can look up which blocks points to a signature
    this.blocks.forEach((block) => {
      // not interested in asset blocks
      if (block.type === BlockType.ASSET) return;

      prevIndex[block.prev as string] = block;
    });

    const assetBlock = this.blocks.find((block) => block.type === BlockType.ASSET && block.symbol === asset);

    // chain has no asset created yet
    if (!assetBlock) return;

    return recursiveLeaf(prevIndex, assetBlock);
  }

  openingBlock(): Block | undefined {
    if (!Array.isArray(this.blocks)) {
      return;
    }

    return this.blocks.filter((block) => block.type === BlockType.OPENING && !block.prev).pop();
  }
}

function recursiveLeaf(index: Record<string, Block>, current: Block): Block {
  const nextBlock = index[current.signature as string];

  if (!nextBlock) return current;

  return recursiveLeaf(index, nextBlock);
}

export function fromBlockchainObject(obj: any) {
  const chain = new Blockchain(obj.publicSig);
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
