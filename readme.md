# Tixl types

If a project uses tixl-types, you have to initialize it accordingly (see https://git-scm.com/book/en/v2/Git-Tools-Submodules).

In the project working directory run

```
git submodule init
git submodule update
```

## SQLite schema

See [schema definition file](./etc/sqlite/sqlite.md).

## Tixl keys

There are several keys used with the Tixl DAG to encrypt block data:

* Private AES key to encrypt block data

* Public and private Signature keys to sign blocks

* Public and private NTRU keys to encrypt certain block fields

Usage of the private AES key

- Encrypt keys on the opening block for the accountchain

- Encrypt keys on the opening block for other stealthchains

- Encrypt block fields for the sender

Usage of the signature keys

- The private key is used to sign blocks on the blockchain it belongs to (accountchains and stealthchains)

- One keypair belongs to one blockchain

- The public key is send along a transaction

- The public key is used to query for a blockchain (therefor it is the blockchain address)

Usage of the NTRU keys

* One keypair is used per wallet for all the related blockchains

* Encrypt send block fields for the receiver

## Tixl address

The TXL address is the public signature key of the accountchain. It is encoded in base58. Let's see an example address: 

> jw7Vy1RFstxS3VwYxEYepdUSP25TTdb8bst2afTC7onp

A wallet might lookup the corresponding NTRU public key to send funds to this address.
