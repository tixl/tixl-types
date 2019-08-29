import { Block, Signature } from './Block';
import { Blockchain } from './Blockchain';
import { PublicKey } from './Keys';
import { Transaction } from './Transaction';
import { InMemory } from './Storage';

export type Ledger = {
  /**
   * Save transactions to the ledger. If inMemory is used, all transactions are saved in-memory.
   * Returns the txs, if it is validated and saved.
   */
  process(txs: Transaction[], inMemory?: InMemory): Promise<Transaction[]>;

  /**
   * Validate a transaction against the existing blockchain data.
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
   * Create and return an in-memory state.
   */
  memory(): Promise<InMemory>;

  /**
   * Persist the in-memory state to disk. Then close the in-memory state.
   * Return the written transactions.
   */
  flush(txs: Transaction[], state: InMemory): Promise<Transaction[]>;
};
