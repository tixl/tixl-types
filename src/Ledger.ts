import { Block, Signature } from './Block';
import { Blockchain } from './Blockchain';
import { PublicKey } from './Keys';
import { Transaction } from './Transaction';

export type Ledger = {
  /**
   * Process a transaction that leads to changes on the blockchain.
   */
  process(tx: Transaction): Promise<Transaction | undefined>;
  getBlockchain(publicKey: PublicKey): Promise<Blockchain | undefined>;
  getBlockBySig(signature: Signature): Promise<Block | undefined>;
  getUnchainedBlocks(): Promise<Block[]>;
  getLatestBlockFromChain(publicKey: PublicKey): Promise<Block | undefined>;
  getAllSendBlocksWithoutReceiveBlock(): Promise<Block[]>;
};
