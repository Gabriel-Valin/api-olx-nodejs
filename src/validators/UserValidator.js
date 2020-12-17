const { checkSchema } = require('express-validator');

module.exports = {
  editAction: checkSchema({
    token: {
      notEmpty: true
    },
    name: {
      optional: true,
      trim: true,
      notEmpty: true,
      isLength: {
        options: {
          min: 6
        },
        errorMessage: 'Your name needs to more than 5 characters.'
      },
    },
    email: {
      optional: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Invalid email.'
    },
    password: {
      optional: true,
      notEmpty: true,
      isLength: {
        options: {min: 4}
      },
      errorMessage: 'Your password needs to more than 4 characters.'
    },
    state: {
      optional: true,
      notEmpty: true,
      errorMessage: 'State not filled.'
    }
  }),
}