const isNode = typeof window === 'undefined';
const fs = isNode ? eval(`require('fs')`) : {};

class Storage {
	constructor(options) {
		this.filePath = options.filePath || './.bit';
	}

	get file() {
		let file = {};
		if (isNode) {
			try {
				file = JSON.parse(fs.readFileSync(this.filePath).toString());
			} catch (e) {}
		}

		return file;
	}

	setItem(key, value) {
		if (isNode) {
			const file = this.file;
			file[key] = value;
			fs.writeFileSync(this.filePath, JSON.stringify(file));
		} else {
			localStorage.setItem(key, value);
		}
	}

	getItem(key) {
		if (isNode) {
			const file = this.file;
			return file[key];
		} else {
			return localStorage.getItem(key);
		}
	}

	removeItem(key) {
		if (isNode) {
			const file = this.file;
			delete file[key];
			fs.writeFileSync(this.filePath, JSON.stringify(file));
		} else {
			localStorage.removeItem(key);
		}
	}
}

module.exports = Storage;
