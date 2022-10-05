const validateEmail = (email) => {
  const emailRegex = /[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}/i;
  if (!email) {
    return {
      message: 'O campo "email" é obrigatório',
    };
  }
  if (!emailRegex.test(email)) {
    return {
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }
};

const validatePassword = (password) => {
  if (!password) {
    return {
      message: 'O campo "password" é obrigatório',
    };
  }
  if (password.length < 6) {
    return {
      message: 'O "password" deve ter pelo menos 6 caracteres',
    };
  }
};

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  
  const emailMessage = validateEmail(email);
  const passwordMessage = validatePassword(password);

  if (emailMessage) {
    return res.status(400).json(emailMessage);
  }
  if (passwordMessage) {
    return res.status(400).json(passwordMessage);
  }

  next();
}

module.exports = validateLogin;
