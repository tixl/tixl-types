import { Block, BlockType } from './Block';
import { SigPublicKey } from './Keys';
import { StorageId } from './Storage';

export class Transaction {
  id: StorageId;
  blocks: Block[] = [];

  /**
   * Is always the public key of the related block chain.
   */
  publicKey: SigPublicKey;

  /**
   * Proof that a certain amount of work was burned.
   */
  work: string;

  /**
   * Network slot when the transaction was accepted.
   */
  slot: number;

  /**
   * Unix timestamp when the tx was accepted.
   */
  networkApprovalAt?: number;

  /**
   * Return true if transaction wants to write an opening block.
   */
  containsOpeningBlock(): boolean {
    if (!Array.isArray(this.blocks)) {
      return false;
    }

    return this.blocks.some(block => block.type === BlockType.OPENING && !block.prev);
  }
}
