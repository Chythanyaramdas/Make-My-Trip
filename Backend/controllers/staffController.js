const bcrypt=require("bcryptjs")
const Staff=require("../models/staffModels")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
const nodemailer=require("nodemailer")
const config=require("../config/config")
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

exports.signup = async (req, res) => {
  console.log("gghghghg");
  try {
    console.log("jhjhkjhjkhjkh");
    const { name, email, password, phone } = req.body;
    console.log(req.body);
    console.log("email", email);

    // Check if the email is already taken
    const existingUser = await Staff.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
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
      req.session.phone = phone;

      res
        .status(200)
        .json({ status: true, message: "User signed up successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
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
      let newUser = new Staff({
        name: req.body.name,
        email: req.body.email,
        mobileNumber: req.body.phone,
        password: hashedPassword,
      });

      console.log(newUser, "userDatas");
      newUser.save().then((data) => {
        console.log(data, "ooooyyyy");

        res.status(200).json({ message: "Authenticated" });
      });
    } else {
      console.log("invalid otp page");
    }
  } catch (error) {
    console.log(error, "ree");
  }
};
// ==================================== staff login========================================

module.exports.staff_Login = async (req, res, next) => {
  console.log("Staffil ethiii");

  console.log("stafflogin isss");

  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    const userData = await Staff.findOne({ email: email });

    console.log(userData, "ooooky");
    console.log("correct");
    if (userData) {
      console.log("is present staff");
      const passwordMatch = bcrypt.compareSync(password, userData.password);
      console.log(passwordMatch);

      if (passwordMatch) {
        const token = jwt.sign(
          { userId: userData._id, role: "staff" },
          process.env.JWT_SECRET_KEY,
          { expiresIn: 30000 }
        );
        console.log(token);

        res
          .status(200)
          .json({ token: token, staff: userData, message: "success token" });
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
};

module.exports.authStaff = async (req, res) => {
  try {
    console.log("req.staff", req.staff);
    res.json({ status: true, staff: req.staff });
  } catch (error) {
    console.log("no auth");
  }
};