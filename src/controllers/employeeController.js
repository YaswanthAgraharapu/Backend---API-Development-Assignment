const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');

// @desc    Create an employee
// @route   POST /api/employees
exports.createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, role, email } = req.body;

  try {
    let employee = await Employee.findOne({ email });

    if (employee) {
      return res.status(400).json({ msg: 'Employee already exists' });
    }

    employee = new Employee({ name, role, email });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all employees
// @route   GET /api/employees
exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};