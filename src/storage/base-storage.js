class BaseStorage {
	setItem(key, value) {
		throw new Error('you must implement `setItem`');
	}

	getItem(key) {
		throw new Error('you must implement `getItem`');
	}

	removeItem(key) {
		throw new Error('you must implement `removeItem`');
	}
}

module.exports = BaseStorage;
