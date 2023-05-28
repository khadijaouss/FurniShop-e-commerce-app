const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

// Get all users
router.get('/', (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(500).json({ error: 'Failed to retrieve users' }));
  });

  // Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Authenticate the user and generate a token
    axios.post('http://auth/login', { email, password })
      .then(response => {
        const { token } = response.data;
        res.json({ token });
      })
      .catch(err => res.status(401).json({ error: 'Invalid credentials' }));
  });

module.exports = router ;