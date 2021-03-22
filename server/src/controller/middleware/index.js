import jwt from 'jsonwebtoken';

export const authorize = (req, res, next) => {
  try {
    const {acc} = req.cookies;
    if (acc) {
      const data = jwt.verify(acc, process.env.JWT_SECRET);
      if (data) {
        req.user = data;
        return next();
      } else {
        res.status(403).json({message: 'invalid token'});
      }
    } else {
      res.status(403).json({message: 'no token'});
    }
  } catch (e) {
    res.status(403).json({message: e.message});
  }
};
