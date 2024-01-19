
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../../controller/auth/user');

router.post('/user/register', UserController.register);
router.post('/user/login', UserController.login);
router.get('/users', UserController.getClient);


module.exports = router;
