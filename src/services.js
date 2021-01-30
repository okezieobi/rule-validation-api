/* eslint-disable camelcase */
const validateRule = ({ rule, data }) => {
  let result;
  const preValidation = {
    status: 'error',
    data: null,
    statusCode: 400,
  };
  if (!rule) {
    preValidation.message = 'rule is required.';
    result = { ...preValidation };
  } else if (typeof rule !== 'object') {
    preValidation.message = 'rule must be an object.';
    result = { ...preValidation };
  } else if (!data) {
    preValidation.message = 'data is required.';
    result = { ...preValidation };
  } else if (typeof data !== 'object') {
    preValidation.message = 'Invalid JSON payload.';
    result = { ...preValidation };
  } else {
    const conditionTest = ['eq', 'neq', 'gt', 'gte'];
    const { field, condition, condition_value } = rule;
    if (!field) {
      preValidation.message = 'rule field is required.';
      result = { ...preValidation };
    } else if (!condition) {
      preValidation.message = 'rule condition is required.';
      result = { ...preValidation };
    } else if (!conditionTest.includes(condition)) {
      preValidation.message = 'rule condition is invalid.';
      result = { ...preValidation };
    } else if (!condition_value) {
      preValidation.message = 'rule condition value is required.';
      result = { ...preValidation };
    } else if (!data[field]) {
      preValidation.message = `field ${field} is missing from data.`;
      result = { ...preValidation };
    } else if (typeof data[field] !== typeof condition_value) {
      preValidation.message = `field ${field} should be a|an ${typeof condition_value}.`;
      result = { ...preValidation };
    } else {
      const validationPassed = {
        message: `field ${field} successfully validated.`,
        status: 'success',
        data: {
          validation: {
            error: false,
          },
        },
      };
      const validationFailed = {
        message: `field ${field} failed validation.`,
        status: 'error',
        statusCode: 400,
        data: {
          validation: {
            error: true,
          },
        },
      };
      if (condition === 'eq') {
        if (data[field] === condition_value) result = { ...validationPassed };
        else result = { ...validationFailed };
      } else if (condition === 'neq') {
        if (data[field] === condition_value) result = { ...validationFailed };
        else result = { ...validationPassed };
      } else if (condition === 'gt') {
        if (data[field] > condition_value && typeof data[field] === 'number' && typeof condition_value === 'number') result = { ...validationPassed };
        else result = { ...validationFailed };
      } else if (condition === 'gte') {
        if (data[field] >= condition_value && typeof data[field] === 'number' && typeof condition_value === 'number') result = { ...validationPassed };
        else result = { ...validationFailed };
      }
      result.data.validation.condition_value = condition_value;
      result.data.validation.condition = condition;
      result.data.validation.field = field;
      result.data.validation.field_value = data[field];
    }
  }
  return result;
};

export default {
  user: {
    message: 'My Rule-Validation API',
    status: 'success',
    data: {
      name: 'Frank Okezie Obiedere',
      github: '@okezieobi',
      email: 'okezieobiedere@gmail.com',
      mobile: '08036019192',
      twitter: '@okezieobiedere',
    },
  },
  validateRule,
};
