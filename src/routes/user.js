export default (Router, handleResponse, { user: { signup, login } }) => {
  const router = Router();

  router.post('/signup', signup, handleResponse);

  router.post('/login', login, handleResponse);

  return router;
};
