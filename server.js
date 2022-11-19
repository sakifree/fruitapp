/********************************** */
// IMPORT DEPENDENCIES
/********************************** */
require("dotenv").config() // Load ENV Variables
const express = require("express") // Import express
const morgan = require("morgan") // Import morgan
const methodOverride = require("method-override") // Allows us to override post request from our ejs/forms
const mongoose = require("mongoose") // gives us the DB connection and cool methods for CRUD to the data
const PORT = process.env.PORT || 3000

const app = express()


/********************************** */
// DATABASE CONNECTION
/********************************** */


// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Establish connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnect to Mongoose"))
    .on("error", () => console.log(error))
   
/********************************** */
// FRUITS MODEL
/********************************** */
const { Schema, model } = mongoose // descructiring, grabbing model and Schema off mongoose variable

const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

const Fruit = model("Fruit", fruitsSchema)

/********************************** */
// MIDDLEWARE
/********************************** */
app.use(morgan("dev")) // Logging
app.use(methodOverride("_method")) // Override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })) // Parse urlencoded request bodies
app.use(express.static("public")) // Serve files from public statically


/********************************** */
// ROUTES - HOME, SEED, INDUCES (INDEX, NEW, DELETE, UPDATE, CREATE, EDIT, SHOW)
/********************************** */
app.get("/", (req, res) => {
    res.send("Server doing what it should be doing")
})

app.get("/fruits/seed", (req, res) => {

    // Define data we want to put in the database
    const startingFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
    ]

    // Delete all fruits
    Fruit.deleteMany({}, (err, data) => {

        // Create new fruits once old fruits are deleted
        Fruit.create(startingFruits, (err, createdFruits) => {
            res.json(createdFruits)
        })
    })
})

app.get("/fruits", (req, res) => {
    // Get all fruits from mongo and send them back
    Fruit.find({})
    .then((fruits) => {
        res.json(fruits)
    })
    .catch(err => console.log(err))
})


/********************************** */
// SERVER LISTENER
/********************************** */
app.listen(PORT, () => {
    console.log(`I wanna dance with somebody on port: ${PORT}`)
})