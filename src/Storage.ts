import { Block } from './Block';

export type Storage = {
  /**
   * Write a list of blocks into the storage.
   * Return the list of persisted blocks.
   */
  persistBlocks(blocks: Block[]): Promise<Block[]>;
};
