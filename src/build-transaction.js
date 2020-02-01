const _Buffer = require('buffer/');
const bitcoin = require('bsv');
const axios = require('axios');
const defaults = {
	rpc: 'https://api.bitindex.network/api',
	fee: 0,
	feeb: 1.05
};

const build = async function(options) {
	let script = null;
	let rpcaddr = options.pay && options.pay.rpc ? options.pay.rpc : defaults.rpc;
	if (options.data) {
		script = _script(options);
	}

	let key = options.pay.key;
	const privateKey = new bitcoin.PrivateKey(key);
	const address = privateKey.toAddress();

	const response = await axios.post(`${rpcaddr}/addrs/utxo`, {
		addrs: [address.toString()].join(',')
	});
	const res = response.data;
	let tx = new bitcoin.Transaction(options.tx).from(res);

	if (script) {
		tx.addOutput(new bitcoin.Transaction.Output({ script: script, satoshis: 0 }));
	}

	if (options.pay.to && Array.isArray(options.pay.to)) {
		options.pay.to.forEach(function(receiver) {
			tx.to(receiver.address, receiver.value);
		});
	}

	tx.fee(defaults.fee).change(address);
	let opt_pay = options.pay || {};
	let myfee = opt_pay.fee || Math.ceil(tx._estimateSize() * (opt_pay.feeb || defaults.feeb));
	tx.fee(myfee);

	for (let i = 0; i < tx.outputs.length; i++) {
		if (tx.outputs[i]._satoshis > 0 && tx.outputs[i]._satoshis < 546) {
			tx.outputs.splice(i, 1);
			i--;
		}
	}

	return tx.sign(privateKey);
};

const _script = function(options) {
	let s = null;
	if (options.data) {
		if (Array.isArray(options.data)) {
			s = new bitcoin.Script();
			s.add(bitcoin.Opcode.OP_FALSE);
			s.add(bitcoin.Opcode.OP_RETURN);
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
		} else if (typeof options.data === 'string') {
			s = bitcoin.Script.fromHex(options.data);
		}
	}
	return s;
};

module.exports = build;
