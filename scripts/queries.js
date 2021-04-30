module.exports = {
    insertRecipe : (data, connection)=>{
        sql = "INSERT INTO recipe(name, ingredients, directions) VALUES(?, ?, ?)"
        mapped_data = [data.recipe_name, data.ingredients, data.directions]
        connection.query(sql, mapped_data,  function (error, results, fields) {
            if (error) throw error;
            console.log(results, fields)
          });
    },
    getAllRecipe : (connection)=>{
        sql = "SELECT * FROM recipe"
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log(results, fields)
          });
    },
    getARecipe : (id, connection)=>{
        sql = "SELECT * FROM recipe where id = ?"
        mapped_data = [id]
        connection.query(sql, mapped_data,  function (error, results, fields) {
            if (error) throw error;
            return (results)?results[0]:null
          });
    }
}