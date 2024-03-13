const express = require("express");
const staff_route = express.Router();
// const authJwt=require("../middleware/staffAuth")
// const userController=require("../controllers/userController")
const multer=require("multer")
const path=require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/images"));
    },
    filename: function (req, file, cb) {
      const name = Date.now() + "-" + file.originalname;
      cb(null, name);
    },
  });
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/webp" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({ storage: storage, fileFilter: fileFilter });

  // const staffAuth=require("../middleware/staffAuth");
  const staffController=require("../controllers/staffController")
  staff_route.post("/register",staffController.signup)
  staff_route.post("/verify_staff",staffController.verification)
  // staff_route.post(
  //   "/resetPasswordOtp",
  //   staffController.resetPasswordOtp
  // );
  // staff_route.post(
  //   "/verifiyNewPassword",
  //   staffController.verifyNewPassword
  // );
  // staff_route.post("/newPassword", staffController.newPassword);
  staff_route.post("/staff_Login",staffController.staff_Login)


  module.exports=staff_route;
