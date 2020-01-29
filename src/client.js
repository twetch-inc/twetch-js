const BSVABI = require('../bsvabi');
const axios = require('axios');

const Storage = require('./storage');
const Wallet = require('./wallet');

class Client {
	constructor(options = {}) {
		this.options = options;
		this.storage = Storage;
		this.clientIdentifier = options.clientIdentifier || 'e4c86c79-3eec-4069-a25c-8436ba8c6009';
		this.network = options.network || 'mainnet';
		this.wallet = options.Wallet ? new options.Wallet(options) : new Wallet(options);
		this.client = axios.create({ baseURL: options.apiUrl || 'https://api.twetch.app/v1' });
		this.initAbi();
	}

	async initAbi() {
		this.abi = JSON.parse(Storage.getItem('abi') || '{}');
		this.abi = await this.fetchABI();
		Storage.setItem('abi', JSON.stringify(this.abi));
	}

	async publish(action, payload, file) {
		try {
			console.log('signing address: ', this.wallet.address());

			const balance = await this.wallet.balance();

			if (!balance) {
				return console.log('No Funds. Please add funds to ', this.wallet.address());
			}

			console.log('balance: ', balance / 100000000, 'BSV');

			return this.buildAndPublish(action, payload, file);
		} catch (e) {
			if (e && e.response && e.response.data) {
				console.log(e.response.data);
			} else {
				console.log(e);
			}
		}
	}

	async buildAndPublish(action, payload, file) {
		try {
			if (!this.abi || !this.abi.name) {
				await this.initAbi();
			}

			const abi = new BSVABI(this.abi, {
				network: this.network,
				sign: value => this.wallet.sign(value),
				address: () => this.wallet.address(),
				invoice: () => this.invoice
			}).action(action);

			if (file) {
				abi.fromFile(file);
			}

			abi.fromObject(payload);

			const payeeResponse = await this.fetchPayees({ args: abi.toArray(), action });
			this.invoice = payeeResponse.invoice;
			await abi.replace();
			const tx = await this.wallet.buildTx(abi.toArray(), payeeResponse.payees);

			const fromTx = new BSVABI(this.abi, {
				network: this.network
			})
				.action(action)
				.fromTx(tx.toString());

			const response = await this.publishRequest({
				signed_raw_tx: tx.toString(),
				invoice: payeeResponse.invoice,
				action
			});
			return { ...response, txid: tx.hash };
		} catch (e) {
			if (e && e.response && e.response.data) {
				console.log(e.response.data);
			} else {
				console.log(e);
			}
		}
	}

	async fetchABI() {
		const response = await this.client.get('/abi');
		return response.data;
	}

	async fetchPayees(payload) {
		const response = await this.client.post('/payees', {
			...payload,
			client_identifier: this.clientIdentifier
		});
		return response.data;
	}

	async publishRequest(payload) {
		const response = await this.client.post('/publish', payload);
		return response.data;
	}
}

module.exports = Client;
