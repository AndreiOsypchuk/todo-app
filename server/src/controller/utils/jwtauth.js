import jwt from 'jsonwebtoken'


export const tokenize = (data, exp, secret = process.env.JWT_SECRET ) => {
  const token = jwt.sign(data, secret, {expiresIn: exp});
  return token;
}