const { genSalt, hash, compare } = require('bcryptjs');

// eslint-disable-next-line consistent-return
const hashPassword = async (password) => {
  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log({ error });
  }
};
const comparePassword = async (enteredPassword, originalPassword) => {
  const isMatch = await compare(enteredPassword, originalPassword);
  return isMatch;
};

module.exports = {
  hashPassword,
  comparePassword,
};
