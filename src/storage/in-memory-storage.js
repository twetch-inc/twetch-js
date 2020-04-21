const BaseStorage = require('./base-storage');

class InMemoryStorage extends BaseStorage {
	constructor(options = {}) {
		super(options);
		this.map = {};
	}

	setItem(key, value) {
		this.map[key] = value;
	}

	getItem(key) {
		return this.map[key];
	}

	removeItem(key) {
		delete this.map[key];
	}
}

module.exports = InMemoryStorage;
