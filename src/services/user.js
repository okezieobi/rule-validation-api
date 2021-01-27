import bcrypt from '../utils/bcrypt';

export default class UserServices {
  constructor({ User }) {
    this.model = User;
  }

  async create(arg) {
    let data;
    const userExists = await this.model
      .exists({ $or: [{ username: arg.username }, { email: arg.email }] });
    if (userExists) data = { message: 'User already exists with either email or username, please sign in', status: 406 };
    else {
      await this.model.create(arg);
      const user = await this.model
        .findOne({ $and: [{ username: arg.username }, { email: arg.email }] },
          '_id, fullName email username type createdAt').lean();
      data = { user, status: 201 };
    }
    return data;
  }

  async auth(arg) {
    let data;
    const userExists = await this.model
      .findOne({ $or: [{ username: arg.user }, { email: arg.user }] }, 'password');
    if (userExists) {
      const verifyPassword = await bcrypt.compareString(userExists.password, arg.password);
      if (verifyPassword) {
        const user = await this.model
          .findOne({ $or: [{ username: arg.user }, { email: arg.user }] },
            '_id, fullName email username type createdAt updatedAt').lean();
        data = { user, status: 200 };
      } else data = { message: 'Password provided does not match user', status: 401 };
    } else data = { message: 'User not found, please sign up by creating an account', status: 404 };
    return data;
  }

  async authJWT(arg) {
    let data;
    const user = await this.model.findById(arg).lean();
    if (user) data = { user, status: 200 };
    else data = { message: 'User not found, please sign up by creating an account', status: 401 };
    return data;
  }
}
