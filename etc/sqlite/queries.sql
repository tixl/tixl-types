-- activate foreign key constraints
PRAGMA foreign_keys = ON;

-- tables
CREATE TABLE IF NOT EXISTS blockchains (
  id VARCHAR(36) UNIQUE PRIMARY KEY NOT NULL,
  public_key VARCHAR(64) UNIQUE NOT NULL,
  leaf_id VARCHAR(36) UNIQUE,
  FOREIGN KEY (leaf_id) REFERENCES blocks(id)
);

CREATE TABLE IF NOT EXISTS blocks (
  id VARCHAR(36) UNIQUE PRIMARY KEY NOT NULL,
  chain_id  VARCHAR(36) NOT NULL,
  json_content TEXT NOT NULL,
  FOREIGN KEY (chain_id) REFERENCES blockchains(id)
);

-- example queries
INSERT INTO blockchains (id, public_key) VALUES (?,?)
INSERT INTO blocks (id, chain_id, json_content) VALUES (?,?,?)
