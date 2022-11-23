/********************************** */
// IMPORT DEPENDENCIES
/********************************** */
const mongoose = require("./connection")

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
// EXPORT MODEL
/********************************** */
module.exports = Fruit