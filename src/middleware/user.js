export default class UserMiddleWare {
  constructor(validations, controllers) {
    this.signup = [...validations.user.signup, controllers.user.signup, controllers.User.setJWT];
    this.login = [...validations.user.login, controllers.user.login, controllers.User.setJWT];
    this.jwt = [...validations.user.jwt, controllers.User.verifyJWT, controllers.user.findById];
  }
}
