import { Block } from './Block';
import { SigPublicKey, NTRUPublicKey } from './Keys';

export type StorageId = string;

export type Blockchain = {
  id: StorageId;
  leafId: StorageId | undefined;
  publicSig: SigPublicKey;
  publicNtru: NTRUPublicKey | undefined;
  blocks: Block[];

  addBlock(block: Block): void;
  leaf(): Block | undefined;
};
