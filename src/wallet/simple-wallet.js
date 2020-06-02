const BaseWallet = require('./base-wallet');
const buildTransaction = require('../build-transaction');
const InMemoryStorage = require('../storage/in-memory-storage');
const Message = require('../../bsvabi/bsv/message');
const PrivateKey = require('../../bsvabi/bsv/lib/privatekey');
const axios = require('axios');

class SimpleWallet extends BaseWallet {
	constructor(options = {}) {
		super(options);
		const Storage = options.Storage || InMemoryStorage;

		this.storage = new Storage(options);
		this.feeb = options.feeb || 0.5;
		this.network = options.network || 'mainnet';

		if (options.privateKey) {
			this.restore(options.privateKey);
		}
	}

	get privateKey() {
		let privateKey = this.storage.getItem(`${this.network}PrivateKey`);

		if (!privateKey) {
			privateKey = PrivateKey.fromRandom(this.network);
			this.storage.setItem(`${this.network}PrivateKey`, privateKey.toString());
		} else {
			privateKey = PrivateKey.fromString(privateKey);
		}

		if (!this.didShowWarning && !this.storage.getItem('didBackup')) {
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
		this.storage.setItem('didBackup', true);
		console.log(`\nWrite down your private key and keep it somewhere safe: "${this.privateKey}"\n`);
	}

	restore(data) {
		const privateKey = PrivateKey(data);
		this.storage.setItem(`${this.network}PrivateKey`, privateKey.toString());
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

	async utxos() {
		const response = await axios.post(`${this.rpc}/addrs/utxo`, {
			addrs: [this.address()].join(',')
		});
		return response.data;
	}

	async buildTx(data, payees = [], options = {}) {
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
				feeb: this.feeb,
				utxos: options.utxos
			}
		});

		return tx;
	}
}

module.exports = SimpleWallet;
