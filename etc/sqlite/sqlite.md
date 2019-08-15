# SQLite as the main storage engine

## table structure

### blockchains

| Field | Flags | Description |
| --- | --- | --- |
| id | PK, unique, not null | **VARCHAR(64)** sha256 of public_key  |
| public_key | unique, not null | **TEXT** encryption key (NTRU public) |
| leaf_id | FK -> blocks.id, unique | **VARCHAR(64)** block id |

### blocks

| Field | Flags | Description |
| --- | --- | --- |
| id | PK, unique, not null | **VARCHAR(64)** sha256 of signature  |
| chain_id | FK -> blockchains.id, not null | **VARCHAR(64)** blockchain id |
| type | not null | **TEXT** block enum type |
| prev | FK -> blocks.signature, unique | **TEXT** other block signature |
| signature | unique, not null | **TEXT** own block signature |
| commitment_amount | - | **TEXT** pedersen amount commitment |
| commitment_balance | - | **TEXT** pedersen balance commitment |
| receiver_amount | - | **TEXT** encrypted amount for the receiving party |
| receiver_blinding_factor_amount | - | **TEXT** encrypted blinding factor for the receiving party |
| sender_blinding_factor_balance | - | **TEXT** encrypted blinding factor for the sending party |
| sender_balance | - | **TEXT** encrypted balance factor for the sending party |
| sender_amount | - | **TEXT** encrypted amount for the sending party |
