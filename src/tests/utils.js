/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

import models from '../models';
import jwt from '../utils/jwt';

const user = {
  fullName: 'test-fullName', username: 'test-username', email: 'test@email.com', password: 'test-password',
};
const newUser = {
  fullName: 'test-fullName-new', username: 'test-username-new', email: 'test-new@email.com', password: 'test-password',
};
const userDoc = new models.User(user);
const token = jwt.generate(userDoc);
const user404 = {
  fullName: 'test-fullName-fake', username: 'test-username-fake', email: 'test-fake@email.com', password: 'test-password',
};
const user404Doc = new models.User(user404);
const token401 = jwt.generate(user404Doc);

const entity = { title: 'test-title', body: 'test-body', userId: userDoc._id };
const entityDoc = new models.Entity(entity);

export default {
  seed: { userDoc, entityDoc },
  token,
  user,
  entity,
  newUser,
  user404,
  user404Doc,
  token401,
  models,
};
