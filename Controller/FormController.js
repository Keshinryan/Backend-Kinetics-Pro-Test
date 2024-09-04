const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

let submittedData = null;

// Middleware to handle form submission with validation
router.post(
  '/submit-form',
  [
    body('name')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name should contain only alphabets.'),
    body('phoneNumber').isNumeric().withMessage('Phone number must contain only numeric characters.'),
    body('email').isEmail().withMessage('Email is not valid.'),
    body('message').notEmpty().withMessage('Message cannot be empty.'),
    body('address').notEmpty().withMessage('Address cannot be empty.'),
    body('university').notEmpty().withMessage('University cannot be empty.')
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    submittedData = req.body;
    console.log(req.body);
    res.status(200).json({ message: 'Data received successfully' });
  }
);

// Middleware to get the submitted data
router.get('/get-submitted-data', (req, res) => {
  if (submittedData) {
    res.json(submittedData);
  } else {
    res.status(404).json({ message: 'No data found' });
  }
});

module.exports = router;
