const SimpleWallet = require('../wallet/simple-wallet');
const initialPrivateKey = 'L4yPxuPnn7Yzno7byYSebCosrt6zp9Au9QRg9KoEBzF1GXJvJpgq';
const wallet = new SimpleWallet({ privateKey: initialPrivateKey });
wallet.storage.setItem('didBackup', true);

const privateKey = 'KwzP1cawZ9mhjzBmVvLTRLAFq4s8W5Dh7TZYDhumKyAgihn1bAts';
const address = '13nRpHT4QXM6XJYFhXCeDjQxoJAT5EZm7R';
const signature =
	'ILPPN7Ip75qP7M67p7885ttyvzSCT8/VhEnZyqD5mOG7fVTmdzQtv6LWCOiAU+SyYp96Q9iLFcmkCfb7Ehd5x70=';

test('wallet', () => {
	expect(wallet.privateKey.toString()).toBe(initialPrivateKey);
	wallet.restore(privateKey);
	expect(wallet.privateKey.toString()).toBe(privateKey);
	expect(wallet.address()).toBe(address);
	expect(wallet.sign('yo frawg')).toBe(signature);
});
