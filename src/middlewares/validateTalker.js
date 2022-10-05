const validateName = (name) => {
  if (!name) {
    return {
      message: 'O campo "name" é obrigatório',
    };
  }
  if (name.length < 3) {
    return {
      message: 'O "name" deve ter pelo menos 3 caracteres',
    };
  }
};

const validateAge = (age) => {
  if (!age) {
    return {
      message: 'O campo "age" é obrigatório',
    };
  }
  if (age < 18) {
    return {
      message: 'A pessoa palestrante deve ser maior de idade',
    };
  }
};

const validateWatchedAt = (watchedAt) => {
  const dataRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!watchedAt) {
    return { message: 'O campo "watchedAt" é obrigatório' };
  }
  if (!dataRegex.test(watchedAt)) {
    return { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
};

const validateRate = (rate) => {
  const rateRegex = /^[1-5]$/;
  console.log(rate);
  console.log(!rate);

  if (!Number.isInteger(rate)) {
    return { message: 'O campo "rate" é obrigatório' };
  }
  if (!rateRegex.test(rate)) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
};

const validateTalk = (talk) => {
  if (!talk) {
    return { message: 'O campo "talk" é obrigatório' };
  }
  const watchedAtMessage = validateWatchedAt(talk.watchedAt);
  const rateMessage = validateRate(talk.rate);
  if (watchedAtMessage) {
    return watchedAtMessage;
  }
  if (rateMessage) {
    return rateMessage;
  }
};

const validateTalker = (req, res, next) => {
  const { name, age, talk } = req.body;

  const nameMessage = validateName(name);
  const ageMessage = validateAge(age);
  const talkMessage = validateTalk(talk);

  if (nameMessage) {
    return res.status(400).json(nameMessage);
  }
  if (ageMessage) {
    return res.status(400).json(ageMessage);
  }
  if (talkMessage) {
    return res.status(400).json(talkMessage);
  }

  next();
};

module.exports = validateTalker;
