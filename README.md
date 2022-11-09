# Browser-based SHA-256 Hash Miner

A vanity hash miner made with React that can be accessed and used by any device with a modern browser and an Internet connection. Based off of [21e8.com](https://21e8.com/) (no affiliation).

## Inputs

### `Vanity`

Specifies the characters at the beginning of the hash. If it's unnecessary for the user's purposes it can be disabled with the corresponding checkbox.

### `Difficulty`

Specifies the amount of zeros following the vanity. If it's unnecessary for the user's purposes it can be disabled with the corresponding checkbox.

### `Data`

Specifies the data that will be hashed. The data is hashed once, and that hash, plus an appended nonce, is then used as input to mine for the final vanity hash. If it's unnecessary for the user's purposes it can be disabled with the corresponding checkbox.

### `Repeat`

Specifies the number of times that a mining operation will be repeated. Each repetition will result in a unique vanity hash. If it's unnecessary for the user's purposes it can be disabled with the corresponding checkbox.