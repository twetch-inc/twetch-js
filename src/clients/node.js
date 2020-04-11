const Client = require('./index');
const FileStorage = require('../storage/file-storage');

class NodeClient extends Client {
	constructor(options = {}) {
		const Storage = options.Storage || FileStorage;
		super({ ...options, Storage });
	}
}

module.exports = NodeClient;
