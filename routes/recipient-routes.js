const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {

  res.render('recipient-page', { user: req.session.user,
                                 recipientInformation: req.session.recipientInformation,
                                 orderedProducts: req.session.orderedProducts});
});

module.exports = router;