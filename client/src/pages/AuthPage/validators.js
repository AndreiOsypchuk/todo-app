export class Validate {
  static name(str) {
    return /^[A-Za-z0-9 ._]+$/.test(str) ? '' : 'name should not contain special characters';
  }
  static email(str) {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return re.test(str) ? '' : 'email is invalid';
  }
  static password(str) {
    const re = new RegExp('^(?=.{6,})');
    return re.test(str)  ? '' : 'password should be at least 6 characters long';
  }
}