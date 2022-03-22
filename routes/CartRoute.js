const router = require("express").Router()
const CartModel = require("../models/CartModel")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verification")

router.post("/add-to-cart", verifyTokenAndAuthorization, async (req, res) => {
    const addToCart = await CartModel(req.body)

    try {
        const savedToCard = await addToCart.save()
        res.status(201).json(savedToCard)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/update-cart/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updateCart = await CartModel.findByIdAndUpdate(req.params.id, {$set: req.body})
        res.status(201).json(updateCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/delete-cart/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deleteCart = await CartModel.findByIdAndRemove(req.params.id)
        res.status(201).json(deleteCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/cart", async (req, res) => {
    try {
        const cart = await CartModel.find()
        res.status(201).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router