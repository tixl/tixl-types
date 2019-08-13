# SQLite as the main storage engine

## table structure

### blockchains

| Field | Flags | Description |
| --- | --- | --- |
| id | PK, unique, not null | **VARCHAR(36)** uuid/v1 (timestamp based)  |
| public_key | unique, not null | **TEXT** encryption key (NTRU public) |
| leaf_id | FK -> blocks.id, unique | **VARCHAR(36)** a block id |

### blocks

| Field | Flags | Description |
| --- | --- | --- |
| id | PK, unique, not null | **VARCHAR(36)** uuid/v1 (timestamp based)  |
| chain_id | FK -> blockchains.id, not null | **VARCHAR(36)** blockchain id |
| type | not null | **TEXT** block enum type |
| prev | - | **TEXT** other block signature |
| signature | not null | **TEXT** own block signature |
| commitment_amount | - | **TEXT** pedersen amount commitment |
| commitment_balance | - | **TEXT** pedersen balance commitment |
| receiver_amount | - | **TEXT** encrypted amount for the receiving party |
| receiver_blinding_factor_amount | - | **TEXT** encrypted blinding factor for the receiving party |
| sender_blinding_factor_balance | - | **TEXT** encrypted blinding factor for the sending party |
| sender_balance | - | **TEXT** encrypted balance factor for the sending party |
| sender_amount | - | **TEXT** encrypted amount for the sending party |
