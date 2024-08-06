const express = require('express');

const router = express.Router();

const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);
// router.get('/connect', AuthController.getConnect);
// router.get('/disconnect', AuthController.getDisonnect);
// router.get('/users/me', UserController.getMe);

module.exports = router;
