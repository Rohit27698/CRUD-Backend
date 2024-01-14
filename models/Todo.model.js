const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    status : {type : Boolean, required : true},
    user_id : {type : String, required : true}
})

const Todomodel = mongoose.model("todo", todoSchema)

module.exports = {Todomodel}