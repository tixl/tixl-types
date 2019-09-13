import { Block } from './Block';
import { SigPublicKey } from './Keys';

export type Transaction = {
  /**
   * The blocks that shall be written on certain blockchains.
   */
  blocks: Block[];

  /**
   * Is always the public key of the related block chain.
   */
  publicKey: SigPublicKey;

  /**
   * Proof that a certain amount of work was burned.
   */
  work: string;

  /**
   * Return true if transaction wants to write an opening block.
   */
  containsOpeningBlock(): boolean;
};
