import { Block } from './Block';
import { Blockchain } from './Blockchain';
import { Wallet } from './Wallet';

export type Ledger = {
  blockchains: {[ key: string ]: Blockchain};
  unchainedBlocks: Block[];

  addBlockchain(publicKey: string, blockchain: Blockchain): Ledger
  addBlock(block: Block): Ledger
  getBlockchain(publicKey: string): Blockchain
  getUnchainedBlocks(): Block[]
}
