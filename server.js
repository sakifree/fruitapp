/********************************** */
// IMPORT DEPENDENCIES
/********************************** */
require("dotenv").config() // Load ENV Variables
const express = require("express") // Import express
const morgan = require("morgan") // Import morgan
const methodOverride = require("method-override") // Allows us to override post request from our ejs/forms
const Fruit = require("./models/fruit")
const FruitRouter = require("./controllers/fruit")
const app = express()
   
/********************************** */
// MIDDLEWARE
/********************************** */
app.use(morgan("dev")) // Logging
app.use(methodOverride("_method")) // Override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })) // Parse urlencoded request bodies
app.use(express.static("public")) // Serve files from public statically
app.use("/fruits",FruitRouter)

/********************************** */
// SERVER LISTENER
/********************************** */
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`I wanna dance with somebody on port: ${PORT}`)
})