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

[Wallet Documentation](docs/wallet.md)

## Storage

The first time you use the sdk a private key will be generated and saved into a file called `.bit` at the root of your project.
To see the path of this file run `twetch storage` after initializing the sdk.

[Storage Documentation](docs/storage.md)

## CLI Usage

The quickest way to get started is to run the initialization command from the cli

```bash
twetch init
```

After you have completed the initialization steps you can begin using the cli. To post run the following:

```bash
twetch post --content "Hello World from Twetch SDK"
```

[CLI Documentation](docs/cli.md)

## Library Usage

Load the module in your project

```javascript
const Twetch = require('@twetch/sdk');
const twetch = new Twetch(options = {});
```

The first time you use the library follow the instructons printed in the console by running:

```javascript
twetch.init()
```

After following the instructions you may now start to use the library to interact with twetch

```javascript
twetch.publish('twetch/post@0.0.1', {
	bContent: 'Hello World from Twetch SDK'
});
```

[Library Documentation](docs/library.md)
