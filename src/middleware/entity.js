export default class EntityMiddleware {
  constructor(validations, controllers) {
    this.createOne = [...validations.entity.create, controllers.entity.createOne];
    this.getAll = controllers.entity.findAll;
    this.verifyOne = [...validations.entity.id, controllers.entity.findOneById];
    this.updateOne = controllers.entity.updateOne;
  }
}
