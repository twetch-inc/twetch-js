# Twetch JS SDK

## Getting Started

This is a JavaScript library to interact with the Twetch API.
The sdk can be used either as a library in your javascript, or as a command line interface (CLI).

## Install via NPM

To install as a module for use in your own javascript project, from your project's directory run:

```bash
npm install @twetch/sdk
```

To install as a CLI run:

```bash
npm install -g @twetch/sdk
```

## Wallet

The sdk shipps with a simple one address wallet, however it is designed to work with any wallet.
Examples for popular wallets including Money Button, Relay and Handcash will be created and documented.

The first time you use the sdk a private key will be generated and saved into a file called `.bit` at the root of your project.
You will be prompted with an address. 

In order to post on Twetch you will need to:

1) Copy the generated address and add it as a signing address on https://twetch.app/developer
2) Fund your address with some BSV

## CLI Usage

The quickest way to get started is to run the initialization command from the cli

```bash
twetch init
```

After you have completed the initialization steps you can begin using the cli. To post run the following:

```bash
# text post
twetch post --content "Hello World from Twetch SDK"

# text post with mention
twetch post --content "Hello @1 from Twetch SDK"

# text post with mention and branch 
twetch post --content "Hello @4552 from Twetch SDK https://twetch.app/t/9ac9118692f2f0004b3de8e9ec3aad1594291135655f579b2c5b85d364edf255"

# reply
twetch post --content "Hello World from Twetch SDK" --reply 9ac9118692f2f0004b3de8e9ec3aad1594291135655f579b2c5b85d364edf255
```

You can see additional commands and usage by running:

```bash
twetch --help
```

## Library Usage

Load the module in your project

```javascript
const Twetch = require('@twetch/sdk');
const twetch = new Twetch(options);

// text post
twetch.publish('twetch/post@0.0.1', {
	bContent: 'Hello World from Twetch SDK',
	bFilename: `twetch-${new Date().getTime()}.txt`,
	mapTimestamp: `${(process.hrtime()[0] * 1000000000 + process.hrtime()[1]).toString()}`
});

// text post with mention
twetch.publish('twetch/post@0.0.1', {
	bContent: 'Hello @1 from Twetch SDK',
	bFilename: `twetch-${new Date().getTime()}.txt`,
	mapTimestamp: `${(process.hrtime()[0] * 1000000000 + process.hrtime()[1]).toString()}`
});

// text post with mention and branch 
twetch.publish('twetch/post@0.0.1', {
	bContent: 'Hello @4552 from Twetch SDK https://twetch.app/t/9ac9118692f2f0004b3de8e9ec3aad1594291135655f579b2c5b85d364edf255',
	bFilename: `twetch-${new Date().getTime()}.txt`,
	mapTimestamp: `${(process.hrtime()[0] * 1000000000 + process.hrtime()[1]).toString()}`
});

// reply
twetch.publish('twetch/post@0.0.1', {
	bContent: 'Hello World from Twetch SDK',
	mapReply: '9ac9118692f2f0004b3de8e9ec3aad1594291135655f579b2c5b85d364edf255',
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
