const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/authMiddleware');

router.post(
  '/',
  [
    auth, // Protected route
    [
      check('name', 'Name is required').not().isEmpty(),
      check('role', 'Role is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
    ],
  ],
  employeeController.createEmployee
);

router.get('/', employeeController.getEmployees);

module.exports = router;