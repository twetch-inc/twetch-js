# Twetch JS SDK

## Getting Started

This is a JavaScript library to interact with the Twetch API.

## Install via NPM

From your project's directory

```bash
npm install @twetch/sdk
```

You can use the twetch sdk as either as a cli or directly in your javascript applications.
The first time you use the sdk a private key will be generated and saved into a file called `.bit` at the root of your project.
You will be prompted with an address. In order to post on Twetch you will need to:

1) Copy your address and add it as a signing address on https://twetch.app/developer
2) Fund your address with some BSV

The quickest way to get started is to run the initialization command from the cli

```bash
./node_modules/@twetch/sdk/cli init
```

## CLI Usage

To initialize the sdk cli, in your project's directory run:

```bash
./node_modules/@twetch/sdk/cli init
```

After you have completed the initialization steps you can begin using the cli. To post run the following:

```bash
./node_modules/@twetch/sdk/cli post --content "Hello World from Twetch SDK"
```

You can see additional commands and usage by running

```bash
./node_modules/@twetch/sdk/cli --help
```

## Library Usage

Load the module in your project:

```javascript
const Twetch = require('@twetch/sdk');
const twetch = new Twetch(options);

// Text Post
await twetch.publish('twetch/post@0.0.1', {
	bContent: 'Hello world from Twetch api',
	bFilename: `twetch-${new Date().getTime()}.txt`,
	mapTimestamp: `${(process.hrtime()[0] * 1000000000 + process.hrtime()[1]).toString()}`
});
```

### Options

- `clientIdentifier` (guid) - Optional. A client identifier from https://twetch.app/developer
- `network` (string) - Optional. Default `mainnet`
- `apiUrl` (string) - Optional. Default `https://api.twetch.app/v1`
- `Wallet` (Class) - Optional. A JavaScript class which implements the following class methods:
	- `constructor(options)` - Same options passed into the client
	- `address()` returns (string) - Signing address of the wallet
	- `balance()` returns (number) - Balance in satoshis
	- `sign(value)` returns (string) - Signature of the value
	- `buildTx(data, payees)` returns (string) - Signed raw transaction hex
