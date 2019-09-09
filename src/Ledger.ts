import { Block, Signature } from './Block';
import { Blockchain } from './Blockchain';
import { PublicKey } from './Keys';
import { Transaction } from './Transaction';
import { InMemory } from './Storage';

export type Ledger = {
  /**
   * Save one transaction to the ledger. If inMemory is used, all transactions are saved in-memory.
   * Returns the tx, if it is validated and saved.
   */
  process(txs: Transaction, inMemory?: InMemory): Promise<Transaction>;

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

  /**
   * Export disk content to a file path. Start at the transaction id (including the blocks from the transaction).
   * Generates a .sqlite file at the given path.
   */
  export(transactionId: string, path: string): Promise<any>;

  /**
   * Import the given sqlite file into the ledger storage. Generate the .sqlite file with export().
   */
  import(path: string): Promise<any>;

  /**
   * Return a hash that reflects the current state of the blockchain data (like a git commit hash).
   * Include transactions up until the given transaction id. It is generated based on the transaction signatures.
   * Can be calculated with only a light blockchain file (contains only leaf blocks).
   */
  hash(transactionId): Promise<string>;
};
