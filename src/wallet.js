const bitcoin = require('bsv');
const Message = require('bsv/message');
const Storage = require('./storage');
const buildTransaction = require('./build-transaction');
const axios = require('axios');

class Wallet {
	constructor(options = {}) {
		this.feeb = options.feeb || 0.55;
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

		if (!this.didShowWarning && !Storage.getItem('didBackup')) {
			this.didShowWarning = true;
			console.log(
				'\nWarning: If you loose your wallet private key, you will not be able to access the wallet.'
			);
			console.log('The wallet included in the sdk should only be used with small amounts of bsv.');
			console.log('To backup your wallet, run "twetch.wallet.backup()" or "twetch backup"');
			console.log(
				`To restore your wallet from a private key, run 'twetch.wallet.restore("private-key-here")' or 'twetch restore -k "private-key-here"'\n`
			);
		}

		return privateKey;
	}

	backup() {
		Storage.setItem('didBackup', true);
		console.log(`\nWrite down your private key and keep it somewhere safe: "${this.privateKey}"\n`)
	}

	restore(data) {
		const privateKey = bitcoin.PrivateKey(data);
		Storage.setItem(`${this.network}PrivateKey`, privateKey.toString());
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
				to,
				feeb: this.feeb
			}
		});

		return tx;
	}
}

module.exports = Wallet;
