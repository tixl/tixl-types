import { Block, Signature } from './Block';
import { Blockchain } from './Blockchain';
import { PublicKey } from './Keys';
import { Transaction } from './Transaction';
import { InMemory } from './Storage';

export type Ledger = {
  /**
   * Process a transaction that leads to changes on the blockchain.
   */
  process(tx: Transaction, inMemory?: InMemory): Promise<Transaction>;

  /**
   * Validate a transaction against the local blockchain data.
   */
  validate(tx: Transaction, inMemory?: InMemory): Promise<Transaction>;

  /**
   * Returns a blockchain identified by its public key.
   */
  getBlockchain(publicKey: PublicKey): Promise<Blockchain>;

  /**
   * Return blocks identified by the given signatures.
   */
  getBlocksBySig(signatures: Signature[]): Promise<Block[]>;

  /**
   * Return blocks that are leafs to any blockchains, explicitly saved in the table.
   */
  getLeafBlocks(): Promise<Block[]>;

  /**
   * Return all unclaimed send blocks.
   */
  getSendBlocksWithoutReceive(): Promise<Block[]>;

  /**
   * Create an in-memory state.
   */
  memory(): Promise<InMemory>;

  /**
   * Persist the in-memory state. Return the written transactions.
   */
  flush(state: InMemory): Promise<Transaction[]>;
};
