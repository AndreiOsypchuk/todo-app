import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  refTokens: {type: [String]},
});

userSchema.methods.deleteToken = function delteToken(token) {
  this.refTokens = this.refTokens.filter((t) => t !== token);
};

userSchema.methods.addToken = function addToken(token) {
  if (this.refTokens.length >= 3) {
    this.refTokens.pop();
  }
  this.refTokens.push(token);
};

userSchema.methods.findToken = function findToken(token) {
  return this.refTokens.find((t) => t === token);
};




export const User = mongoose.model('User', userSchema);
