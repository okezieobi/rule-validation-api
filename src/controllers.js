import services from './services';

const getUser = (req, res, next) => {
  res.locals.data = services.user;
  next();
};

const validate = ({ body }, res, next) => {
  const result = services.validateRule({ ...body });
  if (result.status === 'error') throw result;
  else {
    res.locals.data = result;
    next();
  }
};

export default {
  getUser, validate,
};
