var mysql   = require('mysql');
const makeConnection = ()=>{
    var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'peterlight',
    password : 'gikQJAf2deVArvRL',
    database : 'recipe_node_app'
    });

    connection.connect(function(err) {
        if (err) {
        console.error('error connecting: ' + err.stack);
        return;
        }
        console.log('connected as id ' + connection.threadId);
        sql = "CREATE TABLE IF NOT EXISTS recipe (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20) NOT NULL, ingredients TEXT, directions TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            // ...
          });
    });
    return connection
}

module.exports = makeConnection