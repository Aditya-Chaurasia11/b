// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const AdminController = require('../../controller/auth/admin');

router.post('/admin/register', AdminController.register);
router.post('/admin/login', AdminController.login);
router.get('/admins', AdminController.getAdmins);


module.exports = router;
