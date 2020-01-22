# Twetch JS SDK

## Getting Started

This is a JavaScript library to interact with the Tweth API.

## Install

From your project's directory

```bash
npm install @twetch/sdk
```

And load the module in your project:

```javascript
const Twetch = require('@twetch/sdk');
```

## Usage

```javascript
const twetch = new Twetch({
	clientIdentifier: 'your-client-identifier-here'
});

// Text Post
await twetch.buildAndPublish('twetch/post@0.0.1', {
	bContent: 'Hello world from Twetch api',
	bFilename: `twetch-${new Date().getTime()}.txt`,
	mapTimestamp: `${(process.hrtime()[0] * 1000000000 + process.hrtime()[1]).toString()}`
});
```
