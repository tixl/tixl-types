import { Block, Signature } from './Block';
import { Blockchain, BlockchainInfo } from './Blockchain';
import { SigPublicKey, NTRUPublicKey } from './Keys';
import { Transaction } from './Transaction';
import { InMemory } from './Storage';

/**
 * The logical total supply of TXL as an unsigned integer.
 */
export const TOTAL_TIXL_SUPPLY = 900000000000;

/**
 * 1 TXL can have up to 7 decimal fractions.
 *
 * This defines how to show the fraction for a TXL value.
 * Note that for large numbers the result will probably be incorrect, when
 * using JavaScripts Number implementation.
 *
 * For example:
 * If a wallet implementation sees `1234567` as a block balance. They can calculate the actual
 * TXL value to be `0.1234567`. As this will be the result of `1234567 / 10000000`.
 */
export const TIXL_DIVISOR: bigint = 10_000_000n;

/**
 * The maximum value of block fields for TXL amounts or balances.
 * Beware that this number is above the Number.MAX_SAFE_INTEGER!
 */
export const MAX_TIXL_VALUE: bigint = 900_000_000_000n * TIXL_DIVISOR;

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
  getBlockchain(key: SigPublicKey, full?: boolean): Promise<Blockchain | undefined>;

  /**
   * Return blocks identified by the given signatures.
   */
  getBlocksBySig(signatures: Signature[]): Promise<Block[]>;

  /**
   * Return blocks that are leafs to any blockchains, explicitly saved in the table.
   */
  getLeafBlocks(): Promise<Block[]>;

  /**
   * Return the latest (n=20) unclaimed send blocks.
   */
  getSendBlocksWithoutReceive(): Promise<Block[]>;

  /**
   * Return a NTRU public key for a blockchain signature key.
   */
  getNtruBySig(key: SigPublicKey): Promise<NTRUPublicKey | undefined>;

  /**
   * Return information about the blockchain that contains this block signature.
   */
  getBlockchainInfo(blockSig: Signature): Promise<BlockchainInfo | undefined>;

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
  createExport(networkApprovalTime: number, path: string): Promise<void>;

  /**
   * Export disk content to a file path. Includes all blockchains and their leaf blocks.
   * Generates a .sqlite file at the given path.
   */
  createLeafExport(networkApprovalTime: number, path: string): Promise<void>;

  /**
   * Import the given sqlite file into the ledger storage.
   */
  runImport(path: string): Promise<void>;

  /**
   * Return the latest transaction.
   */
  latestTx(inMemory?: InMemory): Promise<Transaction | undefined>;

  /**
   * Return a hash that reflects the current state of the blockchain data (like a git commit hash).
   */
  hash(inMemory?: InMemory): Promise<string>;

  /**
   * Delete all blocks that are not leaf blocks.
   */
  prune(): Promise<void>;
};
