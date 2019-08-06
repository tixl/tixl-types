import { Transaction } from './Transaction'

export type EncryptedNumber = number;
export type EncryptedString = string;

export interface SignatureData {
  amount: EncryptedNumber;
  amountCommitment: string;
  balance: EncryptedNumber;
  balanceCommitment: string;
  description: EncryptedString;
  work: string;
}

export enum BlockType {
  OPENING = 'OPENING',
  RECEIVE = 'RECEIVE',
  SEND = 'SEND',
}

export type Block = {
  getAmount(): EncryptedNumber
  getAmountCommitment(): string
  getBalance(): EncryptedNumber
  getBalanceCommitment(): string
  getDataForSignature(): SignatureData
  getDescription(): EncryptedString
  getPreviousBlock(): Block
  getSignature(): string
  getTransaction(): Transaction
  getType(): BlockType
  getWork(): string
  isValid(): boolean
  setAmount(publicKey: string, amount: number): Block
  setBalance(publicKey: string, balance: number): Block
  setDescription(description: string): Block
  setPreviousBlock(block: Block): Block
  setSignature(signature: string): Block
  setTransaction(transaction: Transaction): Block
  setType(type: BlockType): Block
  setWork(work: string): Block
  validateCommitment(): boolean
  verifySignature(accountOwnersPublicKey: string): boolean
}
