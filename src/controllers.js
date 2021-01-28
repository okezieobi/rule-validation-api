import services from './services';

function getUser(req, res, next) {
  res.locals.data = services.user;
  next();
}

export default {
  getUser,
};
