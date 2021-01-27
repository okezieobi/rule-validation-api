import controllers from '../controllers';
import validations from '../validations';
import UserMiddleware from './user';
import EntityMiddleware from './entity';

const user = new UserMiddleware(validations, controllers);
const entity = new EntityMiddleware(validations, controllers);

export default {
  user, entity,
};
