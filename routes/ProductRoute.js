const router = require("express").Router()
const ProductModel = require("../models/ProductModel")
const { verifyTokenAndAuthorization } = require("./verification")

router.post("/sell-product", verifyTokenAndAuthorization, async (req, res) => {
    const newProduct = await new ProductModel(req.body)

    try {
        const savedProduct = await newProduct.save()

        res.status(201).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/update-product/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updateProduct = await ProductModel.findByIdAndUpdate(req.params.id, {$set: req.body})
        res.status(201).json(updateProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/product", async (req, res) => {
    try {
        const product = await ProductModel.find()
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/product/:id", async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Bug!!!
/* router.get("/product/:categories", async (req, res) => {
    try {
        const categories = req.params.categories
        const product = ProductModel.find({categories: {$regex: '.*' + categories + '.*'}})
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}) */

module.exports = router