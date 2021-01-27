export default class EntitySchema {
  constructor(checkSchema) {
    this.validateInput = checkSchema({
      title: {
        in: ['body'],
        isLength: {
          errorMessage: 'Entity title should be at least a character long',
          options: { min: 1, max: 256 },
        },
        isString: {
          errorMessage: 'Entity title must be string data type',
        },
        exists: {
          errorMessage: 'Entity title is required',
          options: { checkFalsy: true },
        },
      },
      body: {
        in: ['body'],
        isLength: {
          errorMessage: 'Entity body should be at least a character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Entity body must be string data type',
        },
        exists: {
          errorMessage: 'Entity body is required',
          options: { checkFalsy: true },
        },
      },
    });

    this.validateEntryId = checkSchema({
      id: {
        in: ['params'],
        isMongoId: {
          errorMessage: 'Entity id does not match MongoId format',
        },
      },
    });
  }
}
