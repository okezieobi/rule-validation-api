export default (Router, handleResponse,
  {
    entity: {
      createOne, getAll, verifyOne, updateOne,
    },
  }) => {
  const router = Router();

  router.route('/')
    .post(createOne, handleResponse)
    .get(getAll, handleResponse);

  router.use('/:id', verifyOne);
  router.route('/:id')
    .put(updateOne, handleResponse)
    .get(handleResponse);

  return router;
};
