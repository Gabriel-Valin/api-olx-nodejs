const express = require('express');
const router = express.Router();
const Auth = require('./middlewares/Auth');
const AuthValidator = require('./validators/AuthValidator');
const UserValidator = require('./validators/UserValidator');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const AdController = require('./controllers/AdController'); 


router.get('/ping', (req, res) => {
  res.json({message: true});
});

router.get('/states', Auth.private, UserController.getStates);

// User Routes
router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

// User

router.get('/user/me', Auth.private, UserController.info);
router.put('/user/me', UserValidator.editAction, Auth.private, UserController.editAction);

// Ad Routes

router.get('/categories', AdController.getCategories);
router.post('/ad/add', Auth.private, AdController.addAction);
router.get('ad/list', AdController.getList);
router.get('ad/item', AdController.getItem);
router.post('/ad:id', Auth.private, AdController.editAction);


module.exports = router;

