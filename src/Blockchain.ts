import { Block } from './Block';

export type Blockchain = {
  blocks: Block[];

  addBlock(block: Block): Blockchain;
};
