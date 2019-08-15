import { Block } from './Block';
import { Blockchain } from './Blockchain';

export type Storage = {
  /**
   * Write a list of blocks into the storage.
   * Return the list of persisted blocks.
   */
  persistBlocks(blocks: Block[]): Promise<Block[]>;

  /**
   * Write a list of chains in to the storage.
   * Return the list of persisted blockchains.
   */
  persistChains(blockchains: Blockchain[]): Promise<Blockchain[]>;

  /**
   * Run as transaction.
   * If the callback Promise resolves, the transaction was committed. Otherwise there was a rollback.
   * Returns a Promise that resolves if the transaction was committed.
   */
  runTransaction(cb: () => Promise<any>, db?: any): Promise<any>;
};
