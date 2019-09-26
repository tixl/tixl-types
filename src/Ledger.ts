import { Block, Signature } from './Block';
import { Blockchain } from './Blockchain';
import { SigPublicKey } from './Keys';
import { Transaction } from './Transaction';
import { InMemory } from './Storage';

export type Ledger = {
  /**
   * Save one transaction to the ledger. If inMemory is used, all transactions are saved in-memory.
   * Returns the tx, if it is validated and saved.
   */
  process(txs: Transaction, inMemory?: InMemory): Promise<Transaction | undefined>;

  /**
   * Validate a transaction against the existing blockchain data.
   */
  validate(tx: Transaction, inMemory?: InMemory): Promise<Transaction | undefined>;

  /**
   * Returns a blockchain identified by its public key.
   */
  getBlockchain(key: SigPublicKey): Promise<Blockchain | undefined>;

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
   * Export disk content to a file path. Start with transactions at the network approval time.
   * Generates a .sqlite file at the given path.
   */
  export(networkApprovalTime: number, path: string): Promise<void>;

  /**
   * Import the given sqlite file into the ledger storage. Generate the .sqlite file with export().
   */
  import(path: string): Promise<void>;

  /**
   * Return a hash that reflects the current state of the blockchain data (like a git commit hash).
   * Include transactions up until the given transaction id.
   * Can be calculated with a light blockchain file (contains only leaf blocks).
   */
  hash(transactionId?: string, state?: InMemory): Promise<string>;
};
