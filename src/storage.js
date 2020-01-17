class Storage {
	static get isNode() {
		return typeof window === 'undefined';
	}

	static get filePath() {
		return process.cwd() + '/.bit';
	}

	static get fs() {
		if (Storage.isNode) {
			return eval(`require('fs')`);
		}
	}

	static get file() {
		let file = {};
		if (Storage.isNode) {
			try {
				file = JSON.parse(Storage.fs.readFileSync(Storage.filePath).toString());
			} catch (e) {}
		}

		return file;
	}

	static setItem(key, value) {
		if (Storage.isNode) {
			const file = Storage.file;
			file[key] = value;
			Storage.fs.writeFileSync(Storage.filePath, JSON.stringify(file));
		} else {
			localStorage.setItem(key, value);
		}
	}

	static getItem(key) {
		if (Storage.isNode) {
			const file = Storage.file;
			return file[key];
		} else {
			return localStorage.getItem(key);
		}
	}

	static removeItem(key) {
		if (Storage.isNode) {
			const file = Storage.file;
			delete file[key];
			Storage.fs.writeFileSync(Storage.filePath, JSON.stringify(file));
		} else {
			localStorage.removeItem(key);
		}
	}
}

module.exports = Storage;
