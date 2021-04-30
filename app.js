const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const expressStatic = require('express-static')
const db = require('./config/sql_client')()
const querier = require('./scripts/queries')
const app = express()
const port = process.env.PORT | 3000

app.set('view engine', 'ejs')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use('/static', expressStatic('./static'))

app.get('/', (req,res)=>{
    sql = "SELECT * FROM recipe"
    db.query(sql, function (error, results, fields) {
        if (error){
            res.send(error)
        }
        res.render('index', {recipes:results})
        });
})

app.get('/get_recipe/:id', (req,res)=>{
    sql = "SELECT * FROM recipe where id = ?"
        mapped_data = [req.params.id]
        db.query(sql, mapped_data,  function (error, results, fields) {
            if (error){
                res.send(error)
            }
            res.json((results)?results[0]:null)
          });
})


app.post('/add_recipe', [bodyparser.urlencoded({ extended: false })], (req,res)=>{
    querier.insertRecipe(req.body, db)
    res.redirect('/')
})


app.post('/edit_recipe/:id', [bodyparser.urlencoded({ extended: false })], (req,res)=>{
    sql = "UPDATE recipe SET name = ?, ingredients = ?, directions = ? WHERE id = ?"
    mapped_data = [req.body.recipe_name, req.body.ingredients, req.body.directions, req.params.id]
    db.query(sql, mapped_data,  function (error, results, fields) {
        if (error){
            res.send(error)
        }
        res.redirect('/')
        });
})

app.delete('/delete_recipe/:id', (req,res)=>{
    sql = "DELETE FROM recipe WHERE id = ?"
    mapped_data = [req.params.id]
    db.query(sql, mapped_data,  function (error, results, fields) {
        if (error){
            res.send(error)
        }
        res.send('done')
        });
})



app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})