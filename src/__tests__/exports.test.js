const {
	BrowserClient,
	Client,
	NodeClient,
	BaseStorage,
	FileStorage,
	InMemoryStorage,
	LocalStorage,
	BaseWallet,
	SimpleWallet
} = require('../index');

test('imports/exports', () => {
	expect(new Client()).toBeInstanceOf(require('../clients/index'));
	expect(new BrowserClient()).toBeInstanceOf(require('../clients/browser'));
	expect(new NodeClient()).toBeInstanceOf(require('../clients/node'));

	expect(new BaseStorage()).toBeInstanceOf(require('../storage/base-storage'));
	expect(new FileStorage()).toBeInstanceOf(require('../storage/file-storage'));
	expect(new InMemoryStorage()).toBeInstanceOf(require('../storage/in-memory-storage'));
	expect(new LocalStorage()).toBeInstanceOf(require('../storage/local-storage'));

	expect(new BaseWallet()).toBeInstanceOf(require('../wallet/base-wallet'));
	expect(new SimpleWallet()).toBeInstanceOf(require('../wallet/simple-wallet'));
});
