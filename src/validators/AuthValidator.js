const { checkSchema } = require('express-validator');

module.exports = {
  signup: checkSchema({
    name: {
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
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Invalid email.'
    },
    password: {
      notEmpty: true,
      isLength: {
        options: {min: 4}
      },
      errorMessage: 'Your password needs to more than 4 characters.'
    },
    state: {
      notEmpty: true,
      errorMessage: 'State not filled.'
    }
  }),
  signin: checkSchema({
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Invalid email.'
    },
    password: {
      notEmpty: true,
      isLength: {
        options: {min: 7}
      },
      errorMessage: 'Your password needs to more than 7 characters.'
    },
  })
}