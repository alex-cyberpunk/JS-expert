const { readFile } = require('fs/promises');

class BaseRepository {
  constructor({ file }) {
    this.file = file;
  }

  async find(itemId) {
    const content = await this._currentFileContent();
    if (!itemId) return content;

    return content.find(({ id }) => itemId === id);
  }

  async _currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }
}

module.exports = BaseRepository;