const Client = require('./index');
const LocalStorage = require('../storage/local-storage');

class BrowserClient extends Client {
	constructor(options = {}) {
		const Storage = options.Storage || LocalStorage;
		super({ ...options, Storage });
	}
}

module.exports = BrowserClient;
