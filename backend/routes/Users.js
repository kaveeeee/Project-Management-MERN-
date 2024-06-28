const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

users.use(cors());

process.env.SECRET_KEY = 'secret';

users.post('/register', (req, res) => {
    const today = new Date();
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        registration_number: req.body.registration_number,
        full_name: req.body.full_name,
        name_with_initials: req.body.name_with_initials,
        gender: req.body.gender,
        batch: req.body.batch,
        specialization: req.body.specialization,
        profile: req.body.profile,
        created: today
    }

    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).send("Error hashing password");
                    } else {
                        userData.password = hash; // Set hashed password
                        User.create(userData)
                            .then(user => {
                                res.json({ status: user.email + " registered" });
                            })
                            .catch(err => {
                                res.status(500).send("Error registering user: " + err);
                            });
                    }
                });
            } else {
                res.status(400).json({ error: "User already registered" });
            }
        })
        .catch(err => {
            res.status(500).send("Error: " + err);
        });
});

users.post('/login',(req,res)=>{
    User.findOne({
        email:req.body.email
    })
    .then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const payload = {
                    _id : user._id,
                    first_name:user.first_name,
                    last_name:user.last_name,
                    email:user.email
                }
                let token = jwt.sign(payload,process.env.SECRET_KEY,{
                    expiresIn:1440
                })
                res.send(token)
            }else{
                res.json({error:"User does not exists in the system"})
            }
        }else{
            res.json({error:"User does not exist"})  
        }
    })
    .catch(err =>{
        res.send("error"+err);
    })
})

users.get('/profile',(req,res) => {
    var decoded = jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)

    User.findOne({
        _id:decoded._id
    })
    .then(user => {
        if(user){
            res.json(user)
        }else{
            res.send("User does not exist");
        }
    })
    .catch(err => {
        res.send("Error"+err);

    })

})

// Add a new route for updating user details
users.post('/profile/update', (req, res) => {
    const userId = req.body.userId; // Assuming you send the userId along with the updated details
    const updatedData = req.body.updatedData; // Data to be updated

    User.findByIdAndUpdate(userId, updatedData, { new: true })
        .then(updatedUser => {
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        })
        .catch(err => {
            res.status(500).send("Error: " + err);
        });
});



// Route to get all user details
users.get('/users', (req, res) => {
    User.find({}, '-password') // Excluding password field from the result
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).send("Error: " + err);
        });
});

module.exports = users;