const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()

//Route
const AuthRoute = require("./routes/AuthRoute")
const ProductRoute = require("./routes/ProductRoute")
const CartRoute = require("./routes/CartRoute")

dotenv.config()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("connected to db"))
        .catch((err) => console.log(err))

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 5000...")
})

app.use("/api", AuthRoute)
app.use("/api", ProductRoute)
app.use("/api", CartRoute)