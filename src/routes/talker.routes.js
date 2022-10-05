const express = require('express');
const { getAll } = require('../services/talkerService');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkers = await getAll();
  console.log(talkers);
  res.status(200).json(talkers);
});

module.exports = router;
