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

    if (!talkerSpecified) {
      return;
    }

    return talkerSpecified;
  } catch (error) {
    console.error(error);
  }
};

const create = async (talker) => {
  try {
    const talkerFile = await fs.readFile('src/talker.json', 'utf-8');
    const talkers = JSON.parse(talkerFile);
    const talkerWithId = { ...talker, id: talkers.length + 1 };
    talkers.push(talkerWithId);
    await fs.writeFile('src/talker.json', JSON.stringify(talkers, null, 2), 'utf-8');
    return talkerWithId;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
};
