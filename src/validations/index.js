import { validationResult, checkSchema } from 'express-validator';

import UserSchema from './user';
import EntitySchema from './entity';

const handleValidationErr = (status = 400) => (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else next({ messages: errors.array(), status });
};

const userSchema = new UserSchema(checkSchema);
const entitySchema = new EntitySchema(checkSchema);

export default {
  user: {
    signup: [userSchema.validateSignup, handleValidationErr()],
    login: [userSchema.validateLogin, handleValidationErr()],
    jwt: [userSchema.validateJWT, handleValidationErr(401)],
  },
  entity: {
    create: [entitySchema.validateInput, handleValidationErr()],
    id: [entitySchema.validateEntryId, handleValidationErr()],
  },
};
