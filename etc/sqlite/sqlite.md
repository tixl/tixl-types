# SQLite as the main storage engine

## table structure

### blockchains

| Field | Flags | Description |
| --- | --- | --- |
| id | PK, unique, not null | **VARCHAR(36)** uuid/v1 (timestamp based)  |
| public_key | unique, not null | **VARCHAR(64)** sha256 hash of the encryption key (NTRU public) |
| leaf_id | FK -> blocks.id, unique | **VARCHAR(36)** a block id |

### blocks

| Field | Flags | Description |
| --- | --- | --- |
| id | PK, unique, not null | **VARCHAR(36)** uuid/v1 (timestamp based)  |
| chain_id | FK -> blockchains.id, not null | **VARCHAR(36)** blockchain id |
| type | - | **TEXT** block enum type |
| prev | - | **TEXT** other block signature |
| signature | - | **TEXT** own block signature |
| commitment_amount | - | **TEXT** pedersen amount commitment |
| commitment_balance | - | **TEXT** pedersen amount commitment |
| receiver_amount | - | **TEXT** encrypted amount for the receiving party |
| receiver_blinding_factor_amount | - | **TEXT** encrypted blinding factor for the receiving party |
| sender_blinding_factor_balance | - | **TEXT** encrypted blinding factor for the sending party |
| sender_balance | - | **TEXT** encrypted balance factor for the sending party |
| sender_amount | - | **TEXT** encrypted amount for the sending party |
