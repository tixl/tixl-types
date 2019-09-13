import { Block } from './Block';
import { SigPublicKey } from './Keys';

export type StorageId = string;

export type Blockchain = {
  id: StorageId;
  leafId: StorageId | undefined;
  publicKey: SigPublicKey;
  blocks: Block[];

  addBlock(block: Block): Blockchain;
  leaf(): Block | undefined;
};
