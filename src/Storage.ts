import { Block, Signature } from './Block';
import { Blockchain } from './Blockchain';
import { PublicKey } from './Keys';

export type InMemory = {
  db: any;
};

export type Storage = {
  /**
   * Write a list of blocks into the storage.
   * Return the list of persisted blocks.
   */
  persistBlocks(blocks: Block[], db?: any): Promise<Block[]>;

  /**
   * Write a list of chains in to the storage.
   * Return the list of persisted blockchains.
   */
  persistChains(blockchains: Blockchain[], db?: any): Promise<Blockchain[]>;

  findBlockchain(publicKey: PublicKey): Promise<Blockchain>;
  findLeafBlocks(publicKey?: PublicKey): Promise<Block[]>;
  findBlocks(signatures: Signature[]): Promise<Block[]>;
  findPk(publicKey: PublicKey, db?: any): Promise<PublicKey>;
  findSignatures(signatures: Signature[], db?: any): Promise<Signature[]>;

  /**
   * Return all send blocks that are not referenced by receive blocks.
   */
  findSendBlocksWithoutReference(): Promise<Block[]>;

  /**
   * Run as transaction.
   * If the callback Promise resolves, the transaction was committed. Otherwise there was a rollback.
   * Returns a Promise that resolves if the transaction was committed.
   */
  runTransaction(cb: () => Promise<any>, db?: any): Promise<any>;
};
