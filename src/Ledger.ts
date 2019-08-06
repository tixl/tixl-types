import { Block, Signature } from './Block';
import { Blockchain } from './Blockchain';
import { PublicKey } from './Keys';

export type Ledger = {
  blockchains: { [key: string]: Blockchain };
  unchainedBlocks: Block[];

  addBlockchain(publicKey: PublicKey, blockchain: Blockchain): Ledger;
  addBlock(block: Block): Ledger;

  getBlockchain(publicKey: PublicKey): Blockchain | undefined;
  getBlockBySig(signature: Signature): Block | undefined;
  getUnchainedBlocks(): Block[];
  getLatestBlockFromChain(publicKey: PublicKey): Block | undefined;
  getAllSendBlocksWithoutReceiveBlock(): Block[];

  insertAfterBlock(prev: Block);
};
