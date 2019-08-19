import { Block, Signature } from './Block';
import { Blockchain } from './Blockchain';
import { PublicKey } from './Keys';
import { Transaction } from './Transaction';

export type Ledger = {
  /**
   * Process a transaction that leads to changes on the blockchain.
   */
  process(tx: Transaction): Promise<Transaction>;

  /**
   * Validate a transaction against the local blockchain data.
   */
  validate(tx: Transaction): Promise<Transaction>;

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
};
