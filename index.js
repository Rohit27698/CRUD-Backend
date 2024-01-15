const express = require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require("dotenv").config()
const cors = require("cors")

const { connection } = require("./config/db")
const { todoRouter } = require("./routes/todo.routes")
const { userRouter } = require("./routes/user.routes")
const { Authenticate } = require("./middlewares/Authenticate")

const app = express();

app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Base API endpoint")
})
app.use("/user", userRouter)

app.use(Authenticate)
app.use("/todos", todoRouter)
const PORT = process.env.PORT

app.listen(PORT, async () => {
    try {
        await connection
        console.log("connected to mongodb successfully")
    }
    catch (err) {
        console.log("error connecting to DB")
        console.log(err)
    }
    console.log(`listening on PORT ${PORT}`)
})