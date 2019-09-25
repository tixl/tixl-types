import { Block } from './Block';
import { SigPublicKey } from './Keys';
import { StorageId } from './Blockchain';

export type Transaction = {
  id: StorageId;
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
   * Unix timestamp when the tx was accepted.
   */
  networkApprovalAt?: number;

  /**
   * Return true if transaction wants to write an opening block.
   */
  containsOpeningBlock(): boolean;

  /**
   * Returns a hash based on the blocks in this transaction.
   */
  hash(): StorageId | undefined;
};
