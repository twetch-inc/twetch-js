# Twetch JS SDK

## Getting Started

This is a JavaScript library to interact with the Tweth API.

## Install via NPM

From your project's directory

```bash
npm install @twetch/sdk
```

And load the module in your project:

```javascript
const Twetch = require('@twetch/sdk');
```

## Usage

CLI Usage

```bash
./node_modules/@twetch/sdk/post "Hello World"
```

To use the the twetch sdk, you should first visit https://twetch.app/developer and create a client identifier.
The first time you post, a private key will be created and you will be given a signing address to copy into the Twetch develper page.
Once you've copied your signing address you are now authenticated to post on Twetch using those signing addresses.

```javascript
const twetch = new Twetch({ clientIdentifier: 'your-client-identifier-here' });

// Text Post
await twetch.publish('twetch/post@0.0.1', {
	bContent: 'Hello world from Twetch api',
	bFilename: `twetch-${new Date().getTime()}.txt`,
	mapTimestamp: `${(process.hrtime()[0] * 1000000000 + process.hrtime()[1]).toString()}`
});
```
