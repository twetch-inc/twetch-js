# Wallet Class

To connect any wallet to Twetch, override the default wallet class with your own implementation. 
Fill out these 5 functions to submit an application for listing your wallet on Twetch.

```javascript
const Twetch = require('@twetch/sdk');
class CustomWallet {
	constructor(options = {}) {}

	address() {}

	backup() {}

	async balance() {}

	async buildTx(data, payees = [], options = {}) {}

	sign(message) {}
}

const twetch = new Twetch({ Wallet: CustomWallet });
```

## Options

An options object can have the following keys. The options object from the client will also be passed to the wallet.

- `privateKey` (string) - private key to initialize the wallet with
- `feeb` (number) - Optional. Satoshis per byte in your transaction. Default 0.3.

## Methods

### `address()`
returns (string) - Signing address of the wallet

### `backup()`
returns (string) - A message about backing up your key

### `balance(key)`
returns (number) - Balance in satoshis

### `buildTx(data, payees)`
returns (string) - Signed raw transaction hex

### `sign(value)`
returns (string) - Signature of the value
