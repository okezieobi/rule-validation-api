import userRoutes from './user';
import entryRoutes from './entity';
import middleware from '../middleware';

export default (Router) => {
  const router = Router();

  const handleResponse = (req, res) => {
    res.status(res.locals.data.status).send({ data: res.locals.data });
  };

  router.use('/auth', userRoutes(Router, handleResponse, middleware));
  router.use(middleware.user.jwt);
  router.use('/entities', entryRoutes(Router, handleResponse, middleware));

  return router;
};
