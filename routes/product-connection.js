var express = require('express');
var router = express.Router();
var conn = require('../database/db_connection');
 
// render data from db
router.get('/', function(req, res, next) {
  // If not logged in
  if(!req.session.user) {
    console.log('No user found...');
    return res.redirect('/guest-view-route');
  }
  console.log("Session data:", req.session.user);

  let products = "SELECT * FROM amazon_products";

  // Executing SQL Query
  conn.query(products, function(err, results) {
    if(err) {
      throw err;
    }
    
    // pass the results to the './views/main-page' and render it
    res.render('main-page', { products: results,
                              user: req.session.user
    });     
  });
});


// Routes for Filtering fetch products based on inputs or buttons
// TAB FILTER
router.get('/tab-filter', (req, res) => {
  const { category } = req.query;

  if (!category) {
    console.error("Category parameter is missing.");
    return res.status(400).send("Category parameter is required");
  }

  const query = "SELECT * FROM amazon_products WHERE product_category = ?";
  
  conn.query(query, [category], (error, results) => {
    if (error) {
      console.error("Database error:", error);  
      return res.status(500).send("Internal Server Error");
    }

    if (results.length === 0) {
      console.log("No products found for category:", category);
      return res.status(404).send("No products found for this category");
    }

    res.json(results);
  });
});


// SEARCH INPUT FILTER
router.get('/search-filter', (req, res) => {
  const { search } = req.query;

  // If user did not search any
  if(!search) {
    const query = `SELECT * FROM amazon_products`;
    conn.query(query, (error, results) => {
      if(error) {
        console.error("Database Error", error);
        return res.status(500).send("Internal Server Error");
      }
  
      if(results.length === 0) {
        return res.status(404).send("No products found from this search")
      }
  
      return res.json(results);
    });

    return;
  }
  
  const query = `
    SELECT * FROM amazon_products 
    WHERE product_name LIKE ? 
       OR product_category LIKE ? 
       OR product_color LIKE ? 
       OR product_price LIKE ?`;

  // Wildcard operator for partial matches
  const searchTerm = `%${search}%`;

  conn.query(query, [ searchTerm, search, searchTerm, search, searchTerm, search, searchTerm, search], (error, results) => {
    if(error) {
      console.error("Database Error", error);
      return res.status(500).send("Internal Server Error");
    }

    if(results.length === 0) {
      return res.status(404).send("No products found from this search")
    }

    res.json(results);
  });
});


// FILTER PRODUCTS USING FILTER ICON
router.get('/filter-icon-filter', (req, res) => {
  const {minPrice, maxPrice} = req.query;
  console.log('Min and Max Price: ', minPrice, maxPrice);

  if (!minPrice || !maxPrice) {
    console.error("Min and/or Max Price parameters are missing.");
    return res.status(400).send("Both minPrice and maxPrice parameters are required");
  }

  const query = `
      SELECT * FROM amazon_products
      WHERE product_price >= ? AND product_price <= ?`;

  conn.query(query, [minPrice, maxPrice], (error, results) => {
    if(error) {
      console.error("Database Error", error);
      return res.status(500).send("Internal Server Error");
    }

    if(results.length === 0) {
      return res.status(404).send("No products found from this search")
    }

    res.json(results);
  });
});


module.exports = router;