const { User } = require('../models');
const { jwtService } = require('../services');

const verifyToken = async (req, res, next) => {
  try {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
      // eslint-disable-next-line prefer-destructuring
      token = authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorised' });
    }

    const decoded = await jwtService.verifyToken(token);
    if (!decoded || !decoded.id) {
      return res.send('User does not exists!');
    }

    const currentUser = await User.findById(decoded?.id);
    if (!currentUser) {
      return res.send('User does not exists!');
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.body.user = currentUser;
    res.locals.user = currentUser;
    return next();
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { verifyToken };
