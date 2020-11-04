require('dotenv').config();
const express = require('express');
const cors = require('cors')
const db = require('./db')
const morgan = require('morgan');

const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());

//GET all
app.get('/api/v1/restaurants', async (req, res) => {
    try {
        const results = await db.query(
            'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;'
        );

        res.status(200).json({
        success: true,
        results: results.rows.length,
        data: {
            restaurants: results.rows,
        }
    })
    } catch (err) {
        res.status(500).json({
            Error:  err.message,
        })
    }
    
})

//GET one
app.get("/api/v1/restaurants/:id", async (req, res)=>{
    try {
        const restaurant = await db.query("SELECT * FROM restaurants WHERE id= $1", [req.params.id])

        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id= $1", [req.params.id])

        res.status(200).json({
            success: true,
            results: {
                restaurant: restaurant.rows.length,
                reviews: reviews.rows.length
            },
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            Error: err.message
        })
    }
})

// POST restaurant
app.post("/api/v1/restaurants/", async (req, res) =>{
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", [req.body.name, req.body.location, req.body.price_range]);

        res.status(201).json({
            success: true,
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            Error: err.message
        })
    }
})

//UPDATE restaurant
app.put("/api/v1/restaurants/:id", async (req, res) =>{
    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *", [req.body.name, req.body.location, req.body.price_range, req.params.id])

        res.status(200).json({
            success: true,
            data: {
                restaurants: results.rows[0]
            }
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            Error: err.message
        })
    }
})

//DELETE restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) =>{
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id= $1 RETURNING *", [req.params.id])

        res.status(200).json({
            success: true,
            data: {
                restaurants: results.rows
            }
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            Error: err.message
        })
    }
})

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const results = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;", [req.params.id, req.body.name, req.body.review, req.body.rating])

        res.status(201).json({
            success: true,
            data: {
                result: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err.message)
    }
})

const PORT = process.env.PORT || 3005
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))