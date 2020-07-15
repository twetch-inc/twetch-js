const BSVABI = require('../bsvabi/bsvabi');
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
}

module.exports = TwetchCrypto;
