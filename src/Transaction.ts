import { Block, BlockType } from './Block';
import { SigPublicKey, NTRUPublicKey } from './Keys';
import { StorageId } from './Storage';
import { AssetSymbol } from './Blockchain';

export class Transaction {
  id: StorageId;
  blocks: Block[] = [];

  constructor(symbol?: AssetSymbol) {
    this.assetSymbol = symbol || AssetSymbol.TXL;
  }

  /**
   * Is always the public signature key of the related blockchain.
   */
  publicSig: SigPublicKey;

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
   * Explicitly use this asset.
   */
  assetSymbol: AssetSymbol;

  /**
   * Return true if transaction wants to create a new blockchain.
   */
  containsOpeningBlock(): boolean {
    if (!Array.isArray(this.blocks)) {
      return false;
    }

    return this.blocks.some(block => block.type === BlockType.OPENING && !block.prev);
  }
}
