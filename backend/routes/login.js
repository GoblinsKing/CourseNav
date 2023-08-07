var express = require('express');
var jsonWebToken = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var router = express.Router();
const userModel = require('../models/userModel');

const SECRET_KEY = 'MCIP05_secret_key'

router.get('/', function(req, res, next) {
  res.send('You can login use the POST method (this is GET)!');
});

router.post('/', function(req, res){
    //Check if all fields are provided and are valid:
    if(!req.body.aID || !req.body.password){
       return res.status(400).send({message: "Missing Username/Password"});
    }
    userModel.findOne({AID: req.body.aID}, function (err, data) {
        if (err) return handleError(err);
        if (data != null){
            if (bcrypt.compareSync(req.body.password, data.PASSWORD)){
                const token = jsonWebToken.sign({
                    userId:1
                },SECRET_KEY,{
                    expiresIn:"24h"
                });
                res.send({message: "Login successfully!", token: token, name: data.NAME});
            }
            else{
                res.status(403);
                res.send({message: "Invalid Username/Password"});
            }
        }
        else{
            res.status(403);
            res.send({message: "Invalid Username/Password"});
        }
    });
 });

module.exports = router;
