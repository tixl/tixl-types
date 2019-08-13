-- activate foreign key constraints
PRAGMA foreign_keys = ON;

-- tables
CREATE TABLE IF NOT EXISTS blockchains (
  id VARCHAR(36) UNIQUE PRIMARY KEY NOT NULL,
  public_key TEXT UNIQUE NOT NULL,
  leaf_id VARCHAR(36) UNIQUE,
  FOREIGN KEY (leaf_id) REFERENCES blocks(id)
);

CREATE TABLE IF NOT EXISTS blocks (
  id VARCHAR(36) UNIQUE PRIMARY KEY NOT NULL,
  chain_id  VARCHAR(36) NOT NULL,
  type TEXT NOT NULL,
  prev TEXT,
  signature TEXT NOT NULL,
  commitment_amount TEXT,
  commitment_balance TEXT,
  receiver_amount TEXT,
  receiver_blinding_factor_amount TEXT,
  sender_blinding_factor_balance TEXT,
  sender_balance TEXT,
  sender_amount TEXT,
  FOREIGN KEY (chain_id) REFERENCES blockchains(id)
);

-- example queries
INSERT INTO blockchains (id, public_key) VALUES (?,?)
INSERT INTO blocks (id, chain_id, type, signature) VALUES (?,?,?,?)