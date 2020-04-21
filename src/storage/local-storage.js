const BaseStorage = require('./base-storage');
const isNode = typeof window === 'undefined';

class LocalStorage extends BaseStorage {
	constructor(options = {}) {
		super(options);
	}

	setItem(key, value) {
		!isNode && localStorage.setItem(key, value);
	}

	getItem(key) {
		return !isNode && localStorage.getItem(key);
	}

	removeItem(key) {
		!isNode && localStorage.removeItem(key);
	}
}

module.exports = LocalStorage;
