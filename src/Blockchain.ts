import { Block, fromBlockObject } from './Block';
import { SigPublicKey, NTRUPublicKey } from './Keys';
import { StorageId } from './Storage';

export class Blockchain {
  id: StorageId;
  leafId: StorageId | undefined;
  publicSig: SigPublicKey;
  publicNtru: NTRUPublicKey | undefined;
  blocks: Block[] = [];

  constructor(publicSig: string, publicNtru?: string) {
    this.publicSig = publicSig;
    this.publicNtru = publicNtru;
  }

  addBlock(block: Block): void {
    this.blocks.push(block);
  }

  leaf(): Block | undefined {
    const prevs = this.blocks.map(block => block.prev).filter(prev => !!prev);
    return this.blocks.find(block => prevs.indexOf(block.signature) === -1);
  }
}

export function fromBlockchainObject(obj: any) {
  const chain = new Blockchain(obj.publicSig, obj.publicNtru);
  chain.blocks = obj.blocks.map(deserializeBlock);

  return chain;
}

export function deserializeBlock(block: object): Block {
  return fromBlockObject(block);
}
