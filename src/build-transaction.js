const _Buffer = require('buffer/');
const axios = require('axios');

const PrivateKey = require('../bsvabi/bsv/lib/privatekey');
const Address = require('../bsvabi/bsv/lib/address');
const Transaction = require('../bsvabi/bsv/lib/transaction');
const Script = require('../bsvabi/bsv/lib/script');
const Opcode = require('../bsvabi/bsv/lib/opcode');

const fetchUtxos = async options => {
	let rpcaddr = options.pay.rpc;
	let key = options.pay.key;
	const privateKey = new PrivateKey(key);
	const address = privateKey.toAddress();
	const response = await axios.post(`${rpcaddr}/addrs/utxo`, {
		addrs: [address.toString()].join(',')
	});
	return response.data;
};

const build = async function(options) {
	let script = null;
	if (options.data) {
		script = _script(options);
	}

	let key = options.pay.key;
	const privateKey = new PrivateKey(key);
	const address = privateKey.toAddress();

	let utxos = options.pay.utxos;

	if (!utxos) {
		utxos = await fetchUtxos(options);
	}

	let tx = new Transaction(options.tx).from(utxos);

	if (script) {
		tx.addOutput(new Transaction.Output({ script: script, satoshis: 0 }));
	}

	options.pay.to.forEach(function(receiver) {
		tx.to(receiver.address, receiver.value);
	});

	tx.fee(0).change(address);
	let fee = Math.ceil(tx._estimateSize() * options.pay.feeb);
	tx.fee(fee);

	if (options.forceFee) {
		const inputAmount = utxos.reduce((a, e) => a + e.satoshis, 0);
		const outputAmount = fee + options.pay.to.reduce((a, e) => a + e.value, 0);

		if (inputAmount - outputAmount < 0) {
			fee = Math.ceil(tx._estimateSize() * options.pay.feeb);
			tx.outputs.splice(-1, 1); // drop fee output
			tx.outputs.splice(-1, 1) // drop last payees output

			const payee = options.pay.to[options.pay.to.length - 1];
			tx.to(payee.address, payee.value - fee);
		}
	}

	for (let i = 0; i < tx.outputs.length; i++) {
		if (tx.outputs[i]._satoshis > 0 && tx.outputs[i]._satoshis < 546) {
			tx.outputs.splice(i, 1);
			i--;
		}
	}

	return tx.sign(privateKey);
};

const _script = function(options) {
	let s = new Script();
	s.add(Opcode.OP_FALSE);
	s.add(Opcode.OP_RETURN);
	options.data.forEach(function(item) {
		if (item.constructor.name === 'ArrayBuffer') {
			let buffer = _Buffer.Buffer.from(item);
			s.add(buffer);
		} else if (item.constructor.name === 'Buffer') {
			s.add(item);
		} else if (typeof item === 'string') {
			if (/^0x/i.test(item)) {
				s.add(Buffer.from(item.slice(2), 'hex'));
			} else {
				s.add(Buffer.from(item));
			}
		} else if (typeof item === 'object' && item.hasOwnProperty('op')) {
			s.add({ opcodenum: item.op });
		}
	});
	return s;
};

exports.fetchUtxos = fetchUtxos;
module.exports = build;
