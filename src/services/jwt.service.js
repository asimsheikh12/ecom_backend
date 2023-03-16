const { sign, verify, decode } = require('jsonwebtoken');

const {
  envConfig: {
    jwt: { jwtSecret, expiresIn },
  },
} = require('../config');

const verifyToken = async (token) => {
  const decoded = await verify(token, jwtSecret);
  return decoded;
};

const decodeToken = (token) => {
  const decodedToken = decode(token);
  return decodedToken;
};

const signToken = (id) => {
  const token = sign({ id }, jwtSecret, {
    expiresIn,
    issuer: 'NodeJS',
  });

  return token;
};

module.exports = {
  verifyToken,
  decodeToken,
  signToken,
};
