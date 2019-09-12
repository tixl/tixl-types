import { Block } from './Block';
import { PublicKey } from './Keys';

export type StorageId = string;

export type Blockchain = {
  id: StorageId;
  leafId: StorageId | undefined;
  publicKey: PublicKey;
  blocks: Block[];

  addBlock(block: Block): Blockchain;
  leaf(): Block | undefined;
};
