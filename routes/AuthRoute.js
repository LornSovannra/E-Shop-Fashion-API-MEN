const router = require("express").Router()
const UserModel = require("../models/UserModel")
const CryptoJS = require("crypto-js")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")

dotenv.config()

router.get("/home", (req, res) => {
    res.send("This is home page!")
})

router.post("/register", async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const isAdmin = req.body.isAdmin

    const newUser = new UserModel({
        username: username,
        email: email,
        password: CryptoJS.AES.encrypt(JSON.stringify(password), process.env.SECRET_KEY).toString(),
        isAdmin: isAdmin
    })

    try{
        const saveUser = await newUser.save();
        res.status(201).json(saveUser)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})
        // !user && res.status(401).json("Wrong email!")

        if(!user) return res.status(401).json("Wrong email!")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        if(originalPassword != req.body.password) return res.status(401).json("Wrong password!")
        // {
        //     res.status(401).json("Wrong password!")
        // }

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn: "30d"})

        const {password, ...others} = user._doc;

        res.status(200).json({...others, accessToken})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router