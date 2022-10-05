const fs = require('fs').promises;

const getAll = async () => {
  try {
    const talkerFile = await fs.readFile('src/talker.json', 'utf-8');
    const talkers = JSON.parse(talkerFile);

    return [...talkers];
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAll,
};
