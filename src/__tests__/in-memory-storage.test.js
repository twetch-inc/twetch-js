const InMemoryStorage = require('../storage/in-memory-storage');
const storage = new InMemoryStorage();

const key = 'foo';
const value = 'bar';

test('read, write, remove', () => {
	storage.setItem(key, value);
	expect(storage.getItem(key)).toBe(value);
	storage.removeItem(key);
	expect(storage.getItem(key)).toBe(undefined);
});
