const BSVABI = require('../bsvabi');
const bsv = require('bsv');
const IES = require('bsv/ecies');
const Mnemonic = require('bsv/mnemonic');
const twetchPublicKey = "022f01e5e15cca351daff3843fb70f3c2f0a1bdd05e5af888a67784ef3e10a2a01";
const ecies = require('../bsvabi/bsv/ecies');
const Crypto = require('../shared-helpers/crypto');
const Buffer = require('buffer/');

class TwetchCrypto {
	static aesEncrypt(plainText, key) {
		return Crypto.aesEncrypt(plainText, key);
	}

	static aesDecrypt(encryptedHex, key) {
		return Crypto.aesDecrypt(encryptedHex, key);
	}

	static generateAesKey(l = 32) {
		return bsv.crypto.Hash.sha256(bsv.PrivateKey().toBuffer()).toString('hex').substring(l);
	}

	static eciesEncrypt(plainText, publicKey) {
		const priv = BSVABI.bitcoin.PrivateKey.fromString(demoPrivateKey);
		return new ecies()
			.publicKey(publicKey)
			.encrypt(plainText)
			.toString('base64');
	}

	static eciesDecrypt(encryptedHex, privateKey) {
		try {
			const priv = BSVABI.bitcoin.PrivateKey.fromString(demoPrivateKey);
			const decryptedMessage = new ecies()
				.privateKey(privateKey)
				.decrypt(Buffer.from(encryptedMessage, 'base64'))
				.toString();
			return decryptedMessage;
		} catch (e) {
			return e.toString();
		}
	}

	static ecdhEncrypt(message, priv) {
		const key = bsv.PrivateKey(priv);
		const ecdh = new IES({'nokey':true}).privateKey(key).publicKey(twetchPublicKey);
		const encrypted = ecdh.encrypt(message);
		return encrypted.toString("hex");
	}
	
	static ecdhDecrypt(encrypted, priv, pub) {
		const encryptedBuffer = bsv.deps.Buffer.from(encrypted, 'hex');
		const key = bsv.PrivateKey(priv);
		const ecdh = new IES({'nokey':true}).privateKey(key).publicKey(pub);
		const message = ecdh.decrypt(encryptedBuffer);
		return message.toString();
	}

	static privFromMnemonic(m){
		const mnemonic = Mnemonic.fromString(m);
		const xpriv = bsv.HDPrivateKey.fromSeed(mnemonic.toSeed());
		return xpriv.deriveChild('m/0/0').privateKey.toString();
	}
}

module.exports = TwetchCrypto;
