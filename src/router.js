import controller from './controllers';

export default (Router) => {
  const router = Router();

  const handleResponse = (req, res) => {
    res.status(res.locals.data.statusCode || 200).send({ ...res.locals.data });
  };

  router.get('/', controller.getUser, handleResponse);
  router.post('/validate-rule', controller.validate, handleResponse);

  return router;
};
