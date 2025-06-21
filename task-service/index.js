const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
const port = 3002

app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected to MongoDB")).catch(err => console.error("MongoDB connection error: ", err));

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('Task', TaskSchema);

app.post('/tasks', async (req,res) => {
    const {title, description, userId} = req.body;
    try{
        const task = new Task({title, description, userId});
        await task.save();
        res.status(201).json(task);
    }
    catch (err) {
        console.error("Error saving: ", err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

app.get('/tasks', async (req,res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }
    catch(err){
        console.error("Error saving: ", err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

app.listen(port, () => {
    console.log(`Task Service is listening on port ${port}`)
})