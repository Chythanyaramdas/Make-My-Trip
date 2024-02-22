import React from "react";
import {Route,Routes} from"react-router-dom"
import LoginPage from"../pages/User/login"
import Registerpage from "../pages/User/register";
import OtpPage from"../pages/User/otp"

const UserRoute=()=>{
    return(
       <Routes>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/register' element={<Registerpage/>}/>
        <Route exact path='/otp' element={<OtpPage/>}/>
       </Routes> 
    )
}
export default UserRoute

