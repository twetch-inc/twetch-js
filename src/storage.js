const isNode = typeof window === 'undefined';

class Storage {
	constructor(options) {
		this.filePath = options.filePath || './.bit';
	}

	get fs() {
		return isNode ? eval(`require('fs')`) : {};
	}

	get file() {
		let file = {};
		if (isNode) {
			try {
				file = JSON.parse(this.fs.readFileSync(this.filePath).toString());
			} catch (e) {}
		}

		return file;
	}

	setItem(key, value) {
		if (isNode) {
			const file = this.file;
			file[key] = value;
			this.fs.writeFileSync(this.filePath, JSON.stringify(file));
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
			this.fs.writeFileSync(this.filePath, JSON.stringify(file));
		} else {
			localStorage.removeItem(key);
		}
	}
}

module.exports = Storage;
