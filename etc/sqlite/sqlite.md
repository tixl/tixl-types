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
| json_content | not null | **TEXT** block contents |

