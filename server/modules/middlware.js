
const jwt = require('jsonwebtoken');
const config = require('./config')

exports.requestMiddleware = (req, res, next) => {
    authenticateMiddleware(req, res, (error) => {
        if (error) {
          return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        next();
      });
}

const verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
};

const authenticateMiddleware = (req, res, next) => {
    if (req.path === '/users/login') {
        return next();
    }

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
  
    try {
      const decodedToken = verifyToken(token);
      req.user = decodedToken;
  
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };