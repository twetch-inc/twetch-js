const bitcoin = require('bsv');
const Mnemonic = require('bsv/mnemonic');
const Message = require('bsv/message');
const Storage = require('./storage');
const datapay = require('datapay');
const axios = require('axios');

class Wallet {
	constructor(options = {}) {
		this.network = options.network || 'mainnet';
	}

	get privateKey() {
		let privateKey = Storage.getItem(`${this.network}PrivateKey`);

		if (!privateKey) {
			privateKey = bitcoin.PrivateKey.fromRandom(options.network);
			Storage.setItem(`${this.network}PrivateKey`, privateKey.toString());
		} else {
			privateKey = bitcoin.PrivateKey.fromString(privateKey);
		}

		return privateKey;
	}

	get address() {
		return this.privateKey.toAddress();
	}

	get publicKey() {
		return this.privateKey.publicKey;
	}

	sign(message) {
		return Message.sign(message, this.privateKey);
	}

	async balance() {
		const response = await axios.get(`${this.rpc}/addr/${this.address.toString()}/utxo`);
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

		return new Promise((resolve, reject) => {
			datapay.build(
				{
					data,
					pay: {
						rpc: this.rpc,
						key: this.privateKey.toString(),
						to
					}
				},
				(err, tx) => {
					if (err) {
						return reject(err);
					}
					return resolve(tx);
				}
			);
		});
	}
}

module.exports = Wallet;
