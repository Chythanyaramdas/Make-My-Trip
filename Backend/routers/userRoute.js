const express=require("express")
const user_route=express.Router();
const userController=require("../controllers/userController")

user_route.post("/register",userController.register)
user_route.post("/verify_otp", userController.verification);
user_route.post(
    "/resetPasswordOtp",
    userController.resetPasswordOtp
  );
  user_route.post(
    "/verifiyNewPassword",
    userController.verifyNewPassword
  );
  user_route.post("/newPassword", userController.newPassword);
//    user_route.get("/token_v", authJWT, userController.authUser);

module.exports=user_route