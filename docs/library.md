# Twetch SDK Library

## Options

When instantiating the sdk you can pass options to configure the instance.

```javascript
const Twetch = require('@twetch/sdk');
const twetch = new Twetch(options = {});
```

an options object can have the following keys:

- `apiUrl` (string) - Optional. Default `https://api.twetch.app/v1`
- `clientIdentifier` (guid) - Optional. A client identifier from https://twetch.app/developer
- `network` (string) - Optional. Default `mainnet`
- `Storage` (Class) - Optional.  A JavaScript class which implements [Storage](docs/storage.md). Accessible after initializing via `instance.storage`.
- `Wallet` (Class) - Optional. A JavaScript class which implements [Wallet](docs/wallet.md). Accessible after initializing via `instance.wallet`. 

## Read Api

To build your queries, visit the dashboard https://api.twetch.app/v1/graphiql.
To authenticate on the dashboard copy your token from `twetch.authenticate()` and add it as a bearer token under "Headers". ex. `"Authorization": "Bearer token-goes-here"`

```javascript
const token = await twetch.authenticate();
const response = await twetch.query(`
	query {
		userById(id: "1") {
			id
			name
		}
	}
`)
```

## Examples

### Text post

```javascript
twetch.publish('twetch/post@0.0.1', {
	bContent: 'Hello World from Twetch SDK'
});
```

### Text post with mention 

```javascript
// 
twetch.publish('twetch/post@0.0.1', {
	bContent: 'Hello @1 from Twetch SDK'
});
```

### Text post with mention and branch

```javascript
twetch.publish('twetch/post@0.0.1', {
	bContent: 'Hello @4552 from Twetch SDK https://twetch.app/t/9ac9118692f2f0004b3de8e9ec3aad1594291135655f579b2c5b85d364edf255'
});
```

### Reply

```javascript
twetch.publish('twetch/post@0.0.1', {
	bContent: 'Hello World from Twetch SDK',
	mapReply: '9ac9118692f2f0004b3de8e9ec3aad1594291135655f579b2c5b85d364edf255'
});
```

### Image Post

NOTE: "mapComment" is used for adding text instead of "bContent" when posting images/media

```javascript
twetch.publish('twetch/post@0.0.1', {
	mapComment: 'Hello World from Twetch SDK'
}, './file.png');
```


### Tweet From Twetch

```javascript
twetch.publish('twetch/post@0.0.1', {
	bContent: 'test',
	payParams: {
		tweetFromTwetch: true, // optional - tweets this Twetch
		hideTweetFromTwetchLink: true // optional - hides Twetch link in tweet
	}
});
```

### Likes

```javascript
twetch.publish('twetch/like@0.0.1', {
	postTransaction: 'abda4a05b98a60e9098f0cccebe5948118189d1b161a0372c35fac654eb87e30'
});
```
