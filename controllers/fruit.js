/********************************** */
// IMPORT DEPENDENCIES
/********************************** */
const express = require("express")
const Fruit = require("../models/fruit")

/********************************** */
// CREATE ROUTER
/********************************** */
const router = express.Router()

/********************************** */
// ROUTES - HOME, SEED, INDUCES (INDEX, NEW, DELETE, UPDATE, CREATE, EDIT, SHOW)
/********************************** */
// SEED ROUTE - creates dummy data that can be manipulated by the routes
router.get("/seed", (req, res) => {


})

// INDEX ROUTE
router.get("/", (req, res) => {
    // Get all fruits from mongo and send them back
    Fruit.find({})
    .then((fruits) => {
        // Renders all fruits as JSON
        // res.json(fruits)
        res.render("fruits/index.ejs", { fruits })
    })
    .catch(err => console.log(err))
})

// NEW ROUTE
router.get("/new", (req, res) => {
    res.render("fruits/new.ejs")
})

// DELETE ROUTE
router.delete("/:id", (req, res) => {
    // Method #1
    // Fruit.findByIdAndDelete(req.params.id, (err, deletedFruit) => {
    //     res.redirect("/fruits")
    // })
    // Method #2
    Fruit.findByIdAndDelete(req.params.id)
    .then((deletedFruit) => {
        res.redirect("/fruits")
    })
})

// UPDATE ROUTE
router.put("/:id", (req, res) => {
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    Fruit.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedFruit) => {
        res.redirect(`/fruits/${req.params.id}`)
    })
})

// CREATE ROUTE
router.post("/", (req, res) => {
    // res.send(req.body)
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    Fruit.create(req.body, (err, createdFruit) => {
        res.redirect("/fruits")
    })
})

// EDIT ROUTE
router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    // Find the fruit and send it to the edit.ejs to prepopulate the form
    Fruit.findById(id, (err, foundFruit) => {
        // res.json(foundFruit)
        res.render("fruits/edit.ejs", { fruit: foundFruit })
    })
})

// SHOW ROUTE
router.get("/:id", (req, res) => {
    // Go and get fruit from the database
    Fruit.findById(req.params.id)
    .then((fruit) => {
        // Renders individual fruit as JSON
        // res.json(fruit)
        res.render("fruits/show.ejs", { fruit })
    })
})

/********************************** */
// EXPORT ROUTER
/********************************** */
module.exports = router