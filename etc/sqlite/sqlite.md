# SQLite as the main storage engine

## table structure

### blockchains

| Field        | Flags                   | Description                                  |
| ------------ | ----------------------- | -------------------------------------------- |
| id           | PK, unique, not null    | **VARCHAR(64)** hash of the public_key field |
| public_key   | unique, not null        | **TEXT** signature public key                |
| leaf_id      | FK -> blocks.id, unique | **VARCHAR(64)** block id                     |
| public_ntru  | unique                  | **TEXT** ntru public key                     |
| asset_symbol |                         | **TEXT** asset symbol, e.g. TXL or BTC       |

### blocks

| Field                           | Flags                          | Description                                                        |
| ------------------------------- | ------------------------------ | ------------------------------------------------------------------ |
| id                              | PK, unique, not null           | **VARCHAR(64)** hash of the signature                              |
| created_at                      | -                              | **INTEGER** time of insert in milliseconds since 1.1.1970          |
| chain_id                        | FK -> blockchains.id, not null | **VARCHAR(64)** blockchain id                                      |
| transaction_id                  | FK -> transactions.id          | **VARCHAR(64)** transaction id                                     |
| type                            | not null                       | **TEXT** block enum type                                           |
| prev                            | FK -> blocks.signature, unique | **TEXT** signature reference to chain blocks                       |
| signature                       | unique, not null               | **TEXT** own block signature                                       |
| payload                         | -                              | **TEXT** encrypted arbitrary data that is stored on the blockchain |
| ref_block                       | FK -> blocks.signature         | **TEXT** signature reference to a block of another chain           |
| ref_asset                       | -                              | TEXT reference for digital assets                                  |
| claim_signature                 | -                              | TEXT only used in asset blocks                                     |
| commitment_amount               | -                              | **TEXT** pedersen amount commitment                                |
| commitment_balance              | -                              | **TEXT** pedersen balance commitment                               |
| receiver_amount                 | -                              | **TEXT** encrypted amount for the receiving party                  |
| receiver_blinding_factor_amount | -                              | **TEXT** encrypted blinding factor for the receiving party         |
| sender_blinding_factor_balance  | -                              | **TEXT** encrypted blinding factor for the sending party           |
| sender_balance                  | -                              | **TEXT** encrypted balance factor for the sending party            |
| sender_amount                   | -                              | **TEXT** encrypted amount for the sending party                    |
| rangeproof_amount               | -                              | **TEXT** rangeproof commitment                                     |
| rangeproof_balance              | -                              | **TEXT** rangeproof commitment                                     |

### transactions

| Field      | Flags                | Description                                               |
| ---------- | -------------------- | --------------------------------------------------------- |
| id         | PK, unique, not null | **VARCHAR(64)** ledger hash after inserting the tx blocks |
| created_at | not null             | **INTEGER** unix time of network approval                 |
| slot       | not null             | **INTEGER** network slot                                  |
