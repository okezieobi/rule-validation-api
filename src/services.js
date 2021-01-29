/* eslint-disable camelcase */
const validateRule = (payload) => {
  let result;
  const preValidation = {
    status: 'error',
    data: null,
    statusCode: 400,
  };
  if (!payload || typeof payload !== 'object') {
    preValidation.message = 'Invalid JSON payload.';
    result = { ...preValidation };
  } else if (!payload.rule) {
    preValidation.message = 'rule is required.';
    result = { ...preValidation };
  } else if (typeof payload.rule !== 'object') {
    preValidation.message = 'rule must be an object.';
    result = { ...preValidation };
  } else if (payload.data) {
    preValidation.message = 'data is required.';
    result = { ...preValidation };
  } else {
    const conditionTest = ['eq', 'neq', 'gt', 'gte'];
    const { field, condition, condition_value } = payload.rule;
    if (!field) result = { message: 'rule field is required.' };
    else if (!condition) result = { message: 'rule condition is required.' };
    else if (!conditionTest.includes(condition)) result = { message: 'rule condition is invalid.' };
    else if (!condition_value) result = { message: 'rule condition value is required.' };
    else if (!Object.keys(payload.data).includes(field)) result = { message: `field ${field} is missing from data` };
    else {
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
        if (payload.data[field] === condition_value) result = { ...validationPassed };
        else result = { ...validationFailed };
      } else if (condition === 'neq') {
        if (payload.data[field] === condition_value) result = { ...validationFailed };
        else result = { ...validationPassed };
      } else if (condition === 'gt') {
        if (payload.data[field] > condition_value && typeof payload.data[field] === 'number' && typeof condition_value === 'number') result = { ...validationPassed };
        else result = { ...validationFailed };
      } else if (condition === 'gte') {
        if (payload.data[field] >= condition_value && typeof payload.data[field] === 'number' && typeof condition_value === 'number') result = { ...validationPassed };
        else result = { ...validationFailed };
      }
      result.data.validation.condition_value = condition_value;
      result.data.validation.condition = condition;
      result.data.validation.field = field;
      result.data.validation.field_value = payload.data[field];
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
