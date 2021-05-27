const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// const mailgun = require("mailgun-js");
// const DOMAIN = 'sandboxae62811302b345e7a22205927e8e79f7.mailgun.org';
// const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
require("dotenv").config();

//Create new admin for Sign Up
exports.signUpNewAdmin = (req, res, next) => {
    Admin.find({email:req.body.email})
    .exec()
    .then(admin => {
        if(admin.length >=1){
            return res.status(409).json({
                message: 'Email exists, Try loggin in Instead'
            });

        }
       
       
        
        
        else{
            bcrypt.hash(req.body.password, 10, (err,hash)=> {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                } else{
                    const admin = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName:req.body.lastName,
                        email: req.body.email,
                        password: hash
                    });


                    admin.save()
                        .then(result =>{
                            console.log(result);
                            res.status(201).json({
                                message: 'Admin created sucessfully..!..'
                            });
                           
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error:err
                            });
                        });
                }
            });
        }

        const token = jwt.sign({firstName, lastName, email, password}, process.env.JWT_ACC_ACTIVATE, {expiresIn: '1y'});

        // const data = {
        //     from: 'noreply@gmail.com',
        //     to: email,
        //     subject: 'Account Activation Link',
        //     html:`
        //     <h2>Please click on given link to activate your account</h2>
        //     <p>${process.env.CLIENT_URL}/authentication/
        //     `
        // };
        mg.messages().send(data, function (error, body) {
            console.log(body);
        });
    });
}

//Admin Login
exports.adminSignIn = (req, res, next) =>{
    Admin.find({email: req.body.email})
    .exec()
    .then(admin =>{
        if(admin.length <1) {
            return res.status(404).json({
                message:"Auth Failed"
            });
        }
        bcrypt.compare(req.body.password, admin[0].password, (err, result) =>{
            if(err){
                return res.status(404).json({
                    message:"Auth Failed"
                })
            }
            if(result){
                const token = jwt.sign(
                    {
                        email: admin[0].email,
                        adminId: admin[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1y'
                    }
                );
                return res.status(200).json({
                    message:"Auth sucessful...",
                    token: token

                });
            }
            res.status(404).json({
                message: 'Auth failed'
            });
        });
    })
    .catch (err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

//Delete Admin
exports.deleteAdmin = (req, res, next)=>{
    Admin.remove({_id: req.params.adminId})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message: 'Admin deleted'
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
}

// //forgotPassword
// exports.forgotPassword = (req, res) => {
//     const {email} = req.body;

//     Admin.findOne({email}, (err,admin) =>{
//         if(err || !admin){
//             return res.status(409).json({
//                 message: 'Admin with this email does not exists'
//             });
//         }

//         const token = jwt.sign({_id: admin._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '1y'});
//         const data = {
//             from: 'noreply@futsalsolution.com',
//             to: email,
//             subject: 'Account Activation Link',
//             html:`
//                 <h2>Please click on the given link to reset your pasword</h2>
//                 <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
//             `
//         };

//         return admin.updateOne({resetLink: token}, function (err, success){
//             if(err){
//                 return res.status(409).json({
//                     message: 'reset password link error'
//                 });
//             }
//             else{
//                 mg.messages().send(data, function (error, body){
//                     if(error){
//                         return res.json({
//                             error: err.message
//                         })
//                     }
//                     return res.json({message: 'Email has been sent, follow the instructions'});
//                 }) ;

//             }

//         })
        

//     })

// }



