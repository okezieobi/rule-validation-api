/*
import jwt from '../utils/jwt';

export default class UserController {
  constructor({ user }, handleServiceOutput) {
    this.service = user;
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.findById = this.findById.bind(this);
    this.handleServiceOutput = handleServiceOutput;
  }

  signup({ body }, res, next) {
    this.service.create(body)
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  login({ body }, res, next) {
    this.service.auth(body)
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  findById(req, { locals: { userId } }, next) {
    this.service.authJWT(userId).then((data) => {
      if (data.message) throw data;
      else next();
    }).catch(next);
  }

  static setJWT(req, res, next) {
    const token = jwt.generate(res.locals.data.user);
    res.cookie('token', token, { expires: new Date(Date.now() + 24 * 3600000), httpOnly: true });
    next();
  }

  static verifyJWT({ cookies }, res, next) {
    jwt.verify(cookies)
      .then(({ _id }) => {
        res.locals.userId = _id;
        next();
      }).catch(next);
  }
}
*/
