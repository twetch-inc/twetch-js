const BaseStorage = require('./base-storage');

class FileStorage extends BaseStorage {
	constructor(options = {}) {
		super(options);
		this.filePath = options.filePath || './.bit';
	}

	get fs() {
		return eval(`require('fs')`);
	}

	get file() {
		let file = {};
		try {
			file = JSON.parse(this.fs.readFileSync(this.filePath).toString());
		} catch (e) {}
		return file;
	}

	setItem(key, value) {
		const file = this.file;
		file[key] = value;
		this.fs.writeFileSync(this.filePath, JSON.stringify(file));
	}

	getItem(key) {
		const file = this.file;
		return file[key];
	}

	removeItem(key) {
		const file = this.file;
		delete file[key];
		this.fs.writeFileSync(this.filePath, JSON.stringify(file));
	}
}

module.exports = FileStorage;
