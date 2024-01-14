const express = require("express")

const {Todomodel} = require("../models/Todo.model")

const todoRouter = express.Router();

todoRouter.get("/", async (req, res) => {
    const todos = await Todomodel.find({user_id:req.userID})
    res.send({"todos" : todos})
})
todoRouter.post("/", async (req, res) => {
    const {title, description,status} = req.body;
    const user_id = req.userID
    const todos = await Todomodel.create({title, description, user_id, status})
    
    res.send({"todos" : todos})
})

todoRouter.patch("/:todoID", async (req, res) => {
    const todoID = req.params.todoID
    const payload = req.body;
    const user_id = req.userID

 
    const todo = await Todomodel.findOne({_id : todoID})
    if(todo?.user_id !== user_id){
        res.send({"message" : `You are not userised to do this`})
    }
    else{
        await Todomodel.findByIdAndUpdate(todoID, payload) 
        res.send({"message" : `todo ${req.params.todoID} successfully updated`})
    }  
})


todoRouter.delete("/:todoID", async (req, res) => {
        const todoID = req.params.todoID;
        const user_id = req.userID
        const todo = await Todomodel.findOne({_id : todoID})
        const todo_user_id = todo.user_id
        if(user_id === todo_user_id){
            await Todomodel.findByIdAndDelete(todoID)
            res.send({message : "deleted successfully"})
        }
        else{
            res.send({message : "Not userised"})
        }
})





module.exports = {todoRouter}