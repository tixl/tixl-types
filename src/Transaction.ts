import { Block } from './Block';
import { PublicKey } from './Keys';

export type Transaction = {
  blocks: Block[];
  publicKey: PublicKey;
  work: string;
};
