class BaseWallet {
	address() {
		throw new Error('you must implement `address`');
	}

	backup() {
		throw new Error('you must implement `backup`');
	}

	sign(message) {
		throw new Error('you must implement `sign`');
	}

	async balance() {
		throw new Error('you must implement `balance`');
	}

	async buildTx(data, payees) {
		throw new Error('you must implement `buildTx`');
	}
};

module.exports = BaseWallet;
