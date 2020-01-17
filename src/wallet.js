const bitcoin = require('bsv');
const Mnemonic = require('bsv/mnemonic');
const Message = require('bsv/message');
const Storage = require('./storage');

class Wallet {
	constructor(options = {}) {
		if (!this.seed) {
			Storage.setItem('seed', Mnemonic.fromRandom().toString());
		}

		const HDPrivateKey = bitcoin.HDPrivateKey.fromSeed(Mnemonic.fromString(this.seed).toSeed(), options.network);
		this.privateKey = HDPrivateKey.privateKey;
		this.publicKey = HDPrivateKey.publicKey;
		this.address = HDPrivateKey.privateKey.toAddress();
	}

	get seed() {
		return Storage.getItem('seed');
	}

	sign(message) {
		return Message.sign(message, this.privateKey);
	}
}

module.exports = Wallet;
