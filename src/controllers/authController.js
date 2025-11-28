const jwt = require('jsonwebtoken');

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = (req, res) => {
  // In a real app, you'd validate a username and password from req.body
  // For this challenge, we'll just generate a token.

  const payload = {
    user: {
      id: '60d0fe4f5311236168a109ca', // Example user ID
      name: 'Test User',
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 3600 }, // Expires in 1 hour
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};