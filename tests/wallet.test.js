const Wallet = require('../src/wallet');
const InMemoryStorage = require('./storage');

const wallet = new Wallet({ Storage: InMemoryStorage });
wallet.storage.setItem('didBackup', true);

const privateKey = 'KwzP1cawZ9mhjzBmVvLTRLAFq4s8W5Dh7TZYDhumKyAgihn1bAts'
const address = '13nRpHT4QXM6XJYFhXCeDjQxoJAT5EZm7R';
const signature = 'ILPPN7Ip75qP7M67p7885ttyvzSCT8/VhEnZyqD5mOG7fVTmdzQtv6LWCOiAU+SyYp96Q9iLFcmkCfb7Ehd5x70=';

test('wallet', () => {
	wallet.restore(privateKey);

	expect(wallet.privateKey.toString()).toBe(privateKey)
	expect(wallet.address()).toBe(address);
	expect(wallet.sign('yo frawg')).toBe(signature);
});
