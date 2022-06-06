const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const pool = require('./connect')

app.use(cors())
app.use(bodyParser.json())
app.set('json spaces', 2)

// http://localhost:/recipesbook/get/all/recipes
app.get('/recipesbook/get/all/recipes', async (req, res) => {
    try {
        const response1 = await pool.query("SELECT * FROM recipes.recipesdata ORDER BY num ASC");
        res.json(response1.rows)
    } catch (err) {
        res.json(err.message);
    }
});

// http://localhost:5000/recipesbook/search/recipes/:searchname
app.get('/recipesbook/search/recipes/:searchname', async (req, res) => {
    try {
        const response2 = await pool.query("SELECT * FROM recipes.recipesdata WHERE name = '"+req.params.searchname+"' OR type = '"+req.params.searchname+"' ORDER BY name ASC");
        res.json(response2.rows)
    } catch (err) {
        res.json(err.message);
    }
});

// http://localhost:5000/recipesbook/search/recipes/moreinfo/:searchname
app.get('/recipesbook/search/recipes/moreinfo/:searchname', async (req, res) => {
    try {
        const response3 = await pool.query("SELECT * FROM recipes.recipesdatainfo WHERE name = '"+req.params.searchname+"'");
        res.json(response3.rows)
    } catch (err) {
        res.json(err.message);
    }
});

// http://localhost:5000/recipesbook/add/newrecipes
app.post('/recipesbook/add/newrecipes', async (req, res) => {
    try {
        const {num,name,type,image,username,description,weight,numberofservings,calories,cookingtime} = req.body;
        await pool.query("INSERT INTO recipes.recipes VALUES(default,$1,$2,$3,$4)",[num,name,type,image]);
        await pool.query("INSERT INTO recipes.recipesadd VALUES(default,current_date,$1,(SELECT max(recipesid) FROM recipes.recipes))",[username]);
        await pool.query("INSERT INTO recipes.recipesmoreinfo VALUES(default,$1,$2,$3,$4,$5,(SELECT max(recipesid) FROM recipes.recipes))",[description,weight,numberofservings,calories,cookingtime]);
    } catch (err) {
        res.json(err.message);
    }
});

// http://localhost:5000/recipesbook/deleted/recipes/:id
app.delete('/recipesbook/deleted/recipes/:id', async (req, res) => {
    try {
        await pool.query("DELETE FROM recipes.recipesadd WHERE recipesaddid = '"+req.params.id+"'");
        await pool.query("DELETE FROM recipes.recipesmoreinfo WHERE infoid = '"+req.params.id+"'");
        await pool.query("DELETE FROM recipes.recipes WHERE recipesid = '"+req.params.id+"'");
      } catch (err) {
        console.log(err.message);
      }
});

app.listen(5000, () => {
    console.log(`Server is running - port 5000`)
})