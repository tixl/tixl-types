  import { Block } from './Block';
  import { Blockchain } from './Blockchain';
  import { Transaction } from './Transaction';

  export * from './Block';
  export * from './Blockchain';
  export * from './Crypto';
  export * from './Transaction';
  export * from './Keys';
  export * from './Ledger';
  export * from './Storage';

export type BlockTx = {
  tx: Transaction;
  block: Block;
};

export type BlockchainTx = {
  tx: Transaction;
  blockchain: Blockchain;
};

export type MultiTx = {
  isMulti: true;
  transactions: Transaction[];
};

export type TxOrMultiTx = Transaction | MultiTx;
