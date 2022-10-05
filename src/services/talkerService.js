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

const getById = async (id) => {
  try {
    const talkerFile = await fs.readFile('src/talker.json', 'utf-8');
    const talkers = JSON.parse(talkerFile);

    const talkerSpecified = talkers.filter((talker) => talker.id === id)[0];
    console.log('2', talkerSpecified);
    if (!talkerSpecified) {
      return;
    }

    return talkerSpecified;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAll,
  getById,
};
