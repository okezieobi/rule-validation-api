import bcrypt from 'bcrypt';

export default class Bcrypt {
  static hashString(password = '') {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  static async compareString(hashedPassword = '', password = '') {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
