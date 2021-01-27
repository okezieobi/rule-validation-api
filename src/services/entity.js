export default class EntityServices {
  constructor({ Entity }) {
    this.model = Entity;
  }

  async create({ title, body, userId }) {
    const entity = await this.model.create({ title, body, userId });
    return { entity, status: 201 };
  }

  async findByOwner({ userId }) {
    const entities = await this.model.find({ userId }, '_id title body createdAt userId updatedAt', { limit: 10, sort: '-createdAt' });
    return { entities, status: 200 };
  }

  async findOneByOwner({ userId, _id }) {
    let data;
    const entity = await this.model.findOne({ $and: [{ userId }, { _id }] }, '_id title userId body createdAt updatedAt');
    if (entity) data = { entity, status: 200 };
    else data = { message: 'Entity not found', status: 404 };
    return data;
  }

  async updateOne({
    userId, title, body, _id,
  }) {
    await this.model.updateOne({ $and: [{ userId }, { _id }] }, { title, body });
    const entity = await this.model.findOne({ $and: [{ userId }, { _id }] }, '_id title userId body createdAt updatedAt');
    return { entity, status: 200 };
  }
}
