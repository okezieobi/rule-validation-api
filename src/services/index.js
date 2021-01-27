import models from '../models';
import UserServices from './user';
import EntityServices from './entity';

const user = new UserServices(models);
const entity = new EntityServices(models);

export default {
  user, entity,
};
