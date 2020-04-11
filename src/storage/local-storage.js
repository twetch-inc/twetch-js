const BaseStorage = require('./base-storage');

class LocalStorage extends BaseStorage {
	constructor(options) {
		super(options);
	}

	setItem(key, value) {
		localStorage.setItem(key, value);
	}

	getItem(key) {
		localStorage.getItem(key);
	}

	removeItem(key) {
		localStorage.removeItem(key);
	}
}

module.exports = LocalStorage;
