var mysql = require('mysql');

// database connection
var conn = mysql.createConnection({
  host: 'localhost',
  database: 'amazon_ads_project',
  user: 'root',
  password: ''
});
 
// configuring the connection
conn.connect(function(err) {
  if(err) {
    console.error('Error Connection: ' + err.stack);
    return;
  }

  console.log('Connected as id ' + conn.threadId);
});

module.exports = conn;