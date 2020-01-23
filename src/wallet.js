const bitcoin = require('bsv');
const Message = require('bsv/message');
const Storage = require('./storage');
const buildTransaction = require('./build-transaction');
const axios = require('axios');

class Wallet {
	constructor(options = {}) {
		this.network = options.network || 'mainnet';
	}

	get privateKey() {
		let privateKey = Storage.getItem(`${this.network}PrivateKey`);

		if (!privateKey) {
			privateKey = bitcoin.PrivateKey.fromRandom(this.network);
			Storage.setItem(`${this.network}PrivateKey`, privateKey.toString());
		} else {
			privateKey = bitcoin.PrivateKey.fromString(privateKey);
		}

		return privateKey;
	}

	address() {
		return this.privateKey.toAddress().toString();
	}

	sign(message) {
		return Message.sign(message, this.privateKey);
	}

	async balance() {
		const response = await axios.get(`${this.rpc}/addr/${this.address()}/utxo`);
		return response.data.reduce((a, e) => a + e.satoshis, 0);
	}

	get rpc() {
		return {
			mainnet: 'https://api.bitindex.network/api',
			testnet: 'https://api.bitindex.network/api/v3/test'
		}[this.network];
	}

	async buildTx(data, payees = []) {
		const to = payees.map(e => ({
			address: e.to,
			value: parseInt((e.amount * 100000000).toFixed(0), 10)
		}));

		const tx = await buildTransaction({
			data,
			pay: {
				rpc: this.rpc,
				key: this.privateKey.toString(),
				to
			}
		});

		return tx;
	}
}

module.exports = Wallet;
