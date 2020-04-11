const fs = require('fs');
const FileStorage = require('../storage/file-storage');
const filePath = `${__dirname}/.bit-temp`;
const storage = new FileStorage({ filePath });

const key = 'foo';
const value = 'bar';

test('read, write, remove', () => {
	storage.setItem(key, value);
	expect(storage.getItem(key)).toBe(value);
	storage.removeItem(key);
	expect(storage.getItem(key)).toBe(undefined);
});

afterAll(() => {
	fs.unlinkSync(filePath);
});
