var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt'); // for pass hashing
var {check, validationResult} = require('express-validator');
var conn = require('../database/db_connection');

// Render sign-in-sign-up page for view
router.get('/sign-in-sign-up', (req, res) => {
  res.render('sign-in-sign-up', {
    errors: [],
    formData: {},
    error: null, 
  });
});


// Handles if password and confirm password does not match or empty
const passwordValidationRules = [
  check("password").notEmpty().withMessage("Please input password"),
  check("confirmPassword").notEmpty().withMessage("Please input confirm password")
  .custom((value, { req }) => {
    if(value !== req.body.password){ // The confirmPassword will be passed to value variable
      throw new Error('Password confirmation does not match with password');
    }

    return true;
  })
];
 

// Sign-Up route
router.post('/sign-up', passwordValidationRules, async (req, res) => {
  // Get validation result and check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Render the sign-up form with error messages and prefilled data
    return res.render('sign-in-sign-up', {
      errors: errors.array(), // Validation errors
      formData: req.body, // Retain user input
      error: null,
    });
  }

  const { firstName, userName, email, password, lastName, contactNumber, age } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hashed password
    const insertQuery = 'INSERT INTO amazon_user(first_name, user_name, email_address, password, last_name, contact_number, age) VALUES(?, ?, ?, ?, ?, ?, ?)';

    conn.query(insertQuery, [firstName, userName, email, hashedPassword, lastName, contactNumber, age], (err, result) => {
      if (err) {
        console.error('Error creating account', err);
        // Handle database error
        return res.render('sign-in-sign-up', {
          errors: errors.array(), 
          formData: req.body, 
          error: null,
        });
      }

      // Redirect to the sign-in view after successful sign-up
      res.redirect('/sign-in-sign-up');
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('sign-in-sign-up', {
      errors: errors.array(), 
      formData: req.body, 
      error: null,
    });
  }
});
 

//  Sign-in route
router.post('/sign-in', (req, res) => {
  const {userName, password} = req.body;

  const selectQuery = 'SELECT * FROM amazon_user WHERE user_name = ?';
  conn.query(selectQuery, [userName], async(err, results) => {
    if(err || results.length === 0) {
      // Render the sign-in page with the error message
      return res.render('sign-in-sign-up', {
        errors: [],
        formData: req.body,
        error: 'Invalid username or password',
      });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
 
    if(isMatch) {
      req.session.user = {
        userName: user.user_name,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email_address
      };

      // Redirect to /main-page if sign-in successful
      res.redirect('/product-connection');
    }
    else {
      return res.render('sign-in-sign-up', {
        errors: [],
        formData: req.body,
        error: 'Invalid username or password',
      });
    }
  });
});


// Sign-out route 
router.get('/sign-out', (req, res) => {
  // Destroy session for sign out
  req.session.destroy((err) => {
  if(err) {
      console.error("Error destroying session", err);
      return res.status(500).json({ message: "Failed to sign out.\nPlease try again..." });
  };

    res.status(200).json({ message: "Sign-out successful.\nYou are now viewing the page as guest." });
  });
});

module.exports = router;
  