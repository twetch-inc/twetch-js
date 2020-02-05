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

## Authentication

In order to post on Twetch you will need to let Twetch know what address you will sign your data with.
To do this you can add the address as a signing address on https://twetch.app/developer.
Any posts signed with your address will display on Twetch as posted by your account. One Twetch account can have
many signing addresses so it's possible to use the SDK with any number of wallets. If you misplaced your key,
you may revoke that signing address from the Twetch developer page.

## Wallet

The sdk ships with a simple wallet, however it is designed to work with any wallet.
Examples for popular wallets including Money Button, Relay One and Handcash will be created and documented.

The first time you use the sdk a private key will be generated and saved into a file called `.bit` at the root of your project.
To see the path of this file run `twetch storage` after initializing the sdk.

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

# images / media
twetch post --content "Hello World" --file file.png 
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
	bContent: 'Hello World from Twetch SDK'
});

// text post with mention
twetch.publish('twetch/post@0.0.1', {
	bContent: 'Hello @1 from Twetch SDK'
});

// text post with mention and branch 
twetch.publish('twetch/post@0.0.1', {
	bContent: 'Hello @4552 from Twetch SDK https://twetch.app/t/9ac9118692f2f0004b3de8e9ec3aad1594291135655f579b2c5b85d364edf255'
});

// reply
twetch.publish('twetch/post@0.0.1', {
	bContent: 'Hello World from Twetch SDK',
	mapReply: '9ac9118692f2f0004b3de8e9ec3aad1594291135655f579b2c5b85d364edf255'
});

// images/media. NOTE: "mapComment" is used for text instead of "bContent" when posting images/media
twetch.publish('twetch/post@0.0.1', {
	mapComment: 'Hello World from Twetch SDK'
}, './file.png');
```

### Options

- `apiUrl` (string) - Optional. Default `https://api.twetch.app/v1`
- `clientIdentifier` (guid) - Optional. A client identifier from https://twetch.app/developer
- `filePath` (string) - Optional. Path to file for persistant storage. Default project directory.
- `network` (string) - Optional. Default `mainnet`
- `Storage` (Class) - Optional. Accessible after initializing via `instance.storage`. In the browser, localStorage will be used. A JavaScript class which implements the following class methods:
	- `file()` returns (json) - key/value pairs saved in storage
	- `setItem(key, value)` - set a key/value pair in storage
	- `getItem(key)` - returns (string) - get a value by key from storage
	- `removeItem(key)` - remove a key/value pair from storage
- `Wallet` (Class) - Optional. Accessible after initializing via `instance.wallet`. A JavaScript class which implements the following class methods:
	- `constructor(options)` - Same options passed into the client
	- `address()` returns (string) - Signing address of the wallet
	- `backup()` - returns (string) - A message about backing up your key
	- `balance()` returns (number) - Balance in satoshis
	- `buildTx(data, payees)` returns (string) - Signed raw transaction hex
	- `restore(privateKey)` - Restores wallet to specified key
	- `sign(value)` returns (string) - Signature of the value
