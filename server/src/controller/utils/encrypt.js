import bcrypt from 'bcrypt'

export const encrypt = async (password) => {
  const saltRounds = 12;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export const compare = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
}