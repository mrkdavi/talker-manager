const express = require('express');
const { getAll, getById } = require('../services/talkerService');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkers = await getAll();

  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getById(+id);
  console.log(1, talker);
  if (!talker) {
    return res.status(404).json(
      {
        message: 'Pessoa palestrante não encontrada',
      },
    );
  }

  res.status(200).json(talker);
});

module.exports = router;
