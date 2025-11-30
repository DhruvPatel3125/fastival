// backend/middleware/adminAuth.js
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const email = req.header('x-user-email');
    if (!email) {
      return res.status(401).json({ message: 'Missing x-user-email header' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    // attach admin user to req if needed
    req.adminUser = user;
    next();
  } catch (err) {
    console.error('adminAuth error:', err);
    res.status(500).json({ message: 'Server error in admin auth' });
  }
};
