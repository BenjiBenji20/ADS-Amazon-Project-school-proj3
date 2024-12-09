var express = require('express');
var router = express.Router();
var conn = require('../database/db_connection');

// render data from db
router.get('/', function(req, res, next) {

  let products = "SELECT * FROM amazon_products";

  // Executing SQL Query
  conn.query(products, function(err, results) {
    if(err) {
      throw err;
    }
    
    // pass the results to the './views/main-page' and render it
    res.render('main-page', { products: results,
                              user: null
     });     
  });
});

module.exports = router;