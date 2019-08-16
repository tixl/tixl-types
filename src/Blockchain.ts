import { Block } from './Block';
import { PublicKey } from './Keys';

export type StorageId = string;

export type Blockchain = {
  id: StorageId;
  leafId: StorageId | null;
  publicKey: PublicKey;
  blocks: Block[];

  addBlock(block: Block): Blockchain;
  leaf(): Block | null;
};
