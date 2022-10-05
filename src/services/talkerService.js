const fs = require('fs').promises;

const TALKER_PATH = 'src/talker.json';

const getAll = async () => {
  try {
    const talkerFile = await fs.readFile(TALKER_PATH, 'utf-8');
    const talkers = JSON.parse(talkerFile);

    return [...talkers];
  } catch (error) {
    console.error(error);
  }
};

const getById = async (id) => {
  try {
    const talkerFile = await fs.readFile(TALKER_PATH, 'utf-8');
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
    const talkerFile = await fs.readFile(TALKER_PATH, 'utf-8');
    const talkers = JSON.parse(talkerFile);
    const talkerWithId = { ...talker, id: talkers.length + 1 };
    talkers.push(talkerWithId);
    await fs.writeFile(TALKER_PATH, JSON.stringify(talkers, null, 2), 'utf-8');
    return talkerWithId;
  } catch (error) {
    console.error(error);
  }
};

const updateById = async (id, talkerData) => {
  try {
    const talkerFile = await fs.readFile(TALKER_PATH, 'utf-8');
    const talkers = JSON.parse(talkerFile);
    const talkerNewData = { id, ...talkerData };
    const talkersUpdated = talkers.map((talker) => {
      if (talker.id === id) {
        return talkerNewData;
      }
      return talker;
    });
    await fs.writeFile(TALKER_PATH, JSON.stringify(talkersUpdated, null, 2), 'utf-8');
    return talkerNewData;
  } catch (error) {
    console.error(error);
  }
};

const deleteById = async (id) => {
  try {
    const talkerFile = await fs.readFile(TALKER_PATH, 'utf-8');
    const talkers = JSON.parse(talkerFile);
    const talkersFiltered = talkers.filter((talker) => talker.id !== id);
    await fs.writeFile(TALKER_PATH, JSON.stringify(talkersFiltered, null, 2), 'utf-8');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
