const User = require("../models/userModel");
const bcrypt=require("bcrypt")
const nodemailer = require("nodemailer");
const config = require("../config/config")
const randomString=require("randomstring")
const express=require("express")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();



const { USER_MAIL, USER_PASSWORD, JWT_SECRET_KEY } = process.env;


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  var otp = Math.floor(Math.random() * (max - min + 1)) + min;
  // = Math.random()* 1000000;


  exports.register = async (req, res) => {
    console.log("gghghghg");
    try {
      console.log("jhjhkjhjkhjkh");
      const { name, email, password} = req.body;
      console.log(req.body);
  
      // Check if the email is already taken
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("already exit");
        res.status(400).json({ message: "Email already exists" });
      } else {
        var mailOptions = {
          from: USER_MAIL,
          to: req.body.email,
          subject: "Otp for registration is: ",
          html:
            "<h3>OTP for account verification is </h3>" +
            "<h1 style='font-weight:bold;'>" +
            otp +
            "</h1>", // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("success", { otp });
          }
        });
  
        req.session.password = password;
        req.session.email = email;
        req.session.name = name;
       
  
        res
          .status(200)
          .json({ status: true, message: "User signed up successfully" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };



  exports.otp = async (req, res, next) => {
    try {
      console.log("haiiiiii", req.body);
  
      const Email = req.body.email;
      console.log(req.body.email);
  
      const user = await User.findOne({ email: req.body.email });
      console.log(user, "hiiiiiihere");
      if (!user) {
        console.log("no user");
  
        // send mail with defined transport object
        var mailOptions = {
          from: USER_MAIL,
          to: req.body.email,
          subject: "Otp for registration is: ",
          html:
            "<h3>OTP for account verification is </h3>" +
            "<h1 style='font-weight:bold;'>" +
            otp +
            "</h1>", // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("success", { otp });
          }
          // res.render("otppage", { status: "false" });
        });
      } else {
        console.log("exit");
        // res.render("home", { status: "true" });
        // res.redirect('/home')
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };


  exports.verification = async (req, res) => {
    console.log("veriiii");
    try {
      console.log(req.body, "body is here");
      req.session.otp = req.body.numberOpt;
      console.log(req.body.result, "Entered otp");
      console.log(otp, "otp send");
  
      if (otp == req.body.result) {
        console.log("iff");
        req.session.password = req.body.password;
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        let newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });
  
        console.log(newUser, "userDatas");
        newUser.save().then((data) => {
          console.log(data, "oooo");
  
          res.status(200).json({ message: "Authenticated" });
        });
      } else {
        console.log("invalid otp page");
      }
    } catch (error) {
      console.log(error, "ree");
    }
  };

  module.exports.authUser = async (req, res) => {
    try {
      res.json({ status: true, user: req.user });
    } catch (error) {
      console.log("no auth");
    }
  };

  module.exports.resetPasswordOtp = async (req, res) => {
    try {
      const { email } = req.body;
      console.log(req.body, "emmmiiiii");
      const userData = await User.findOne({ email: email });
      console.log(!!userData, "du");
      if (userData && userData.name) {
        var mailOptions = {
          from: USER_MAIL,
          to: req.body.email,
          subject: "Otp for registration is: ",
          html:
            "<h3>OTP for account verification is </h3>" +
            "<h1 style='font-weight:bold;'>" +
            otp +
            "</h1>", // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error, "no user ");
          } else {
            console.log("success", { otp });
            res
              .status(200)
              .json({ status: true, message: "User Reset up successfully" });
          }
        });
      } else {
        console.log("not found");
        res.status(404).json({
          status: false,
          message: "No user",
        });
      }
    } catch (error) {
      res.json({
        status: false,
        message: error.message,
      });
      console.log(error.message);
    }
  };

  module.exports.verifyNewPassword = async (req, res) => {
    try {
      console.log(otp, "global otp");
      let result = JSON.parse(otp);
      console.log("resultzzzz");
      if (otp === result) {
        console.log("success");
        res.json({
          status: true,
          message: "successfully done it",
        });
      } else {
        res.json({
          status: false,
          message: "failed",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  module.exports.newPassword = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const hashPassword = await bcrypt.hash(password, 10);
      const data = await User.updateOne(
        { email: email },
        {
          $set: {
            password: hashPassword,
          },
        }
      );
      res.json({
        status: true,
        message: "success completed",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  module.exports.userLogin=async(req,res,next)=>{
    console.log("userLogin");

    try {

      const email=req.body.email
      const password=req.body.password
      console.log(email,password,"miiikiiiii");
      const userData=await User.findOne({email:email});
      console.log(userData._id);
     
      console.log(userData,"000");
      if (userData) {
        console.log("is present");
  
        if (userData.isBlocked === true) {
          console.log("njn");
          res.status(401).json({
            message: "User Blocked",
          });
        }
  
        const passwordMatch = bcrypt.compareSync(password, userData.password);
        console.log(passwordMatch);
  
        if (passwordMatch) {
          console.log(JWT_SECRET_KEY, "kkkk");
          const token = jwt.sign(
            { userId: userData._id, role: "client" },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 30000 }
          );
          console.log(token, "token");
  
          res
            .status(200)
            .json({ token: token, message: "success token", user: userData });
        } else {
          res.status(401).json({ message: "invalid password" });
        }
      } else {
        console.log("pottiii");
        res.status(404).json({ message: "user not found" });
      }
      
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }