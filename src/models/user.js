import bcrypt from '../utils/bcrypt';

export default (Schema) => {
  const schema = new Schema({
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Client', 'Admin'],
      default: 'Client',
    },
  }, { timestamps: true });

  schema.pre('save', function encryptPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashString(this.password);
      next();
    } else next();
  });

  return schema;
};
