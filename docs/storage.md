# Storage Class

```javascript
const Twetch = require('@twetch/sdk');
class CustomStorage {
	constructor(options) {}

	setItem(key, value) {}

	getItem(key) {}

	removeItem(key) {}
}

const twetch = new Twetch({ Storage: CustomStorage });
```

## Options

An options object can have the following keys. The options object from the client will also be passed to the wallet.
- `filePath` (string) - Optional. Path to file for persistant storage. Default project directory.

## Methods

### `setItem(key, value)`
set a key/value pair in storage

### `getItem(key)`
get a value by key from storage

### `removeItem(key)`
remove a key/value pair from storage
