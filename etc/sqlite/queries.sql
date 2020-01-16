-- activate foreign key constraints
PRAGMA foreign_keys = ON;

-- tables
CREATE TABLE IF NOT EXISTS transactions (
  id VARCHAR(64) UNIQUE PRIMARY KEY NOT NULL,
  created_at INTEGER NOT NULL,
  slot INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS blockchains (
  id VARCHAR(64) UNIQUE PRIMARY KEY NOT NULL,
  public_key TEXT UNIQUE NOT NULL,
  public_ntru TEXT UNIQUE,
  leaf_id VARCHAR(64) UNIQUE,
  FOREIGN KEY (leaf_id) REFERENCES blocks(id)
);

CREATE TABLE IF NOT EXISTS blocks (
  id VARCHAR(64) UNIQUE PRIMARY KEY NOT NULL,
  chain_id VARCHAR(64) NOT NULL,
  transaction_id VARCHAR(64),
  type TEXT NOT NULL,
  prev TEXT UNIQUE,
  signature TEXT UNIQUE NOT NULL,
  payload TEXT,
  ref_block TEXT,
  commitment_amount TEXT,
  commitment_balance TEXT,
  rangeproof_amount TEXT,
  rangeproof_balance TEXT,
  receiver_amount TEXT,
  receiver_blinding_factor_amount TEXT,
  sender_blinding_factor_balance TEXT,
  sender_balance TEXT,
  sender_amount TEXT,
  created_at INTEGER,
  FOREIGN KEY (chain_id) REFERENCES blockchains(id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(id),
  FOREIGN KEY (prev) REFERENCES blocks(signature),
  FOREIGN KEY (ref_block) REFERENCES blocks(signature)
);
