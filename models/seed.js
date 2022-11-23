/********************************** */
// IMPORT DEPENDENCIES
/********************************** */
require("dotenv").config()
const Fruit = require("./fruit")
const mongoose = require("./connection")

/********************************** */
// SEED CODE
/********************************** */
mongoose.connection.on("open", () => {
    // Define data we want to put in the database
    const startingFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: true },
        { name: "Cherry", color: "red", readyToEat: true },
    ]

    // Delete all fruits
    Fruit.deleteMany({}, (err, data) => {

        // Create new fruits once old fruits are deleted
        Fruit.create(startingFruits, (err, createdFruits) => {
            console.log("--------FRUITS CREATED----------")
            console.log(createdFruits)
            console.log("--------FRUITS CREATED----------")

            // Close the DB Connection
            mongoose.connection.close()
        })
    })
})

/********************************** */
// SEED CODE
/********************************** */
