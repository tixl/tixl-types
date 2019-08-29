import { Block } from './Block';
import { PublicKey } from './Keys';

export type Transaction = {
  /**
   * The blocks that shall be written on certain blockchains.
   */
  blocks: Block[];

  /**
   * Is always the public key of the related block chain.
   */
  publicKey: PublicKey;

  /**
   * Proof that a certain amount of work was burned.
   */
  work: string;

  /**
   * Return true if transaction wants to write an opening block.
   */
  containsOpeningBlock(): boolean;
};
