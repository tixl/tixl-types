import { Block, Signature } from './Block';
import { Blockchain } from './Blockchain';
import { SigPublicKey } from './Keys';

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

  findBlockchain(publicKey: SigPublicKey, db?: any): Promise<Blockchain | undefined>;
  findLeafBlocks(publicKey?: SigPublicKey, db?: any): Promise<Block[]>;
  findBlocks(signatures: Signature[], publicKey?: SigPublicKey, db?: any): Promise<Block[]>;
  findPk(publicKey: SigPublicKey, db?: any): Promise<SigPublicKey | undefined>;
  findSignatures(signatures: Signature[], publicKey?: SigPublicKey, db?: any): Promise<Signature[]>;
  findPrevSignatures(signatures: Signature[], db?: any): Promise<Signature[]>;

  /**
   * Return all send blocks that are not referenced by receive blocks.
   */
  findUnusedSendBlocks(): Promise<Block[]>;

  /**
   * Run as transaction.
   * If the callback Promise resolves, the transaction was committed. Otherwise there was a rollback.
   * Returns a Promise that resolves if the transaction was committed.
   */
  runTransaction(cb: () => Promise<any>, db?: any): Promise<any>;
};
