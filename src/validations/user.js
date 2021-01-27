export default class UserSchemas {
  constructor(checkSchema) {
    this.validateLogin = checkSchema({
      user: {
        in: ['body'],
        isLength: {
          errorMessage: 'Email or username should be at least a character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Email or username must be string data type',
        },
        exists: {
          errorMessage: 'Email or username is required',
          options: { checkFalsy: true },
        },
      },
      password: {
        in: ['body'],
        isLength: {
          errorMessage: 'Password should be at least a character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Password must be string data type',
        },
        exists: {
          errorMessage: 'Password is required',
          options: { checkFalsy: true },
        },
      },
    });

    this.validateSignup = checkSchema({
      username: {
        in: ['body'],
        isLength: {
          errorMessage: 'Username should be at least a character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Username must be string data type',
        },
        exists: {
          errorMessage: 'Username is required',
          options: { checkFalsy: true },
        },
      },
      fullName: {
        in: ['body'],
        isLength: {
          errorMessage: 'Full name should be at least a character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Full name must be string data type',
        },
        exists: {
          errorMessage: 'Full name is required',
          options: { checkFalsy: true },
        },
      },
      email: {
        in: ['body'],
        isLength: {
          errorMessage: 'Email should be at least a character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Email must be string data type',
        },
        exists: {
          errorMessage: 'Email is required',
          options: { checkFalsy: true },
        },
        isEmail: {
          errorMessage: 'Email format is wrong',
        },
      },
      password: {
        in: ['body'],
        isLength: {
          errorMessage: 'Password should be at least a character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Password must be string data type',
        },
        exists: {
          errorMessage: 'Password is required',
          options: { checkFalsy: true },
        },
      },
    });

    this.validateJWT = checkSchema({
      token: {
        in: ['cookies'],
        isString: {
          errorMessage: 'Token must be string data type',
        },
        exists: {
          errorMessage: 'Token is required',
          options: { checkFalsy: true },
        },
        isJWT: {
          errorMessage: 'Token does not match Json Web Token format',
        },
      },
    });
  }
}
