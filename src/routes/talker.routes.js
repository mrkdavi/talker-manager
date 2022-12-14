const express = require('express');
const validateTalker = require('../middlewares/validateTalker');
const verifyToken = require('../middlewares/verifyToken');
const { getAll, getById, create, updateById, deleteById } = require('../services/talkerService');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkers = await getAll();

  res.status(200).json(talkers);
});

router.post('/', verifyToken, validateTalker, async (req, res) => {
  const talkers = await create(req.body);

  res.status(201).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getById(+id);

  if (!talker) {
    return res.status(404).json(
      {
        message: 'Pessoa palestrante não encontrada',
      },
    );
  }

  res.status(200).json(talker);
});

router.put('/:id', verifyToken, validateTalker, async (req, res) => {
  const { id } = req.params;
  const talker = await updateById(+id, req.body);

  if (!talker) {
    return res.status(404).json(
      {
        message: 'Pessoa palestrante não encontrada',
      },
    );
  }

  res.status(200).json(talker);
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  await deleteById(+id);

  res.status(204).end();
});

module.exports = router;
