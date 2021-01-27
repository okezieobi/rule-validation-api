/*
import services from '../services';
import UserController from './user';
import EntityController from './entity';

const handleServiceOutput = (data, { locals }, next) => {
  if (data.message) throw data;
  else {
    const resLocal = locals;
    resLocal.data = data;
    next();
  }
};
const user = new UserController(services, handleServiceOutput);
const entity = new EntityController(services, handleServiceOutput);

export default {
  user, entity, User: UserController,
};
*/
