const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
const port = 3000

app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected to MongoDB")).catch(err => console.error("MongoDB connection error: ", err));

const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User', UserSchema);

app.post('/users', async (req,res) => {
    const {name, email} = req.body;
    try{
        const user = new User({name, email});
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        console.error("Error saving: ", err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})