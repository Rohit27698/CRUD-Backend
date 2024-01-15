const express = require("express")
const { Usermodel } = require("../models/User.model")



const userRouter = express.Router();


userRouter.post("/signup", async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        bcrypt.hash(password, 4, async function (err, hash) {
            await Usermodel.create({ name, email, password: hash, phone })
            res.send({ message: "User successfully created" })
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Something went wrong, please try again later")
    }
})


userRouter.get("/check", async (req, res) => {

    const user = await Usermodel.find()
    res.send({ user });
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email })
    if (!user) {
        return res.send({ message: "Sign up first" })
    }
    const hash = user?.password
    bcrypt.compare(password, hash, function (err, result) {
        if (result) {
            const token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY);
            res.send({ message: "login successfull", token: token, user: user })
        }
        else {
            res.send({ message: "login failed" })
        }
    });
})
userRouter.patch("/login", async (req, res) => {
    const { name, email, phone, _id } = req.body;
    const user = await Usermodel.findOne({ email })
    try {
        await Usermodel.findByIdAndUpdate(_id, { name, email, phone })
        res.send({ message: "User Updated " })
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Something went wrong, please try again later")
    }
})
userRouter.get("/checkuser/:id", async (req, res) => {
    const _id = req.params.id
    const user = await Usermodel.findOne({ _id: _id })
    res.send({ user });
})




module.exports = { userRouter }