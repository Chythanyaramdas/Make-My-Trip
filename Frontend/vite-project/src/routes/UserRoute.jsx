import React from "react";
import {Route,Routes} from"react-router-dom"
import LoginPage from"../pages/User/login"
import Registerpage from "../pages/User/register";

const UserRoute=()=>{
    return(
       <Routes>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/register' element={<Registerpage/>}/>
       </Routes> 
    )
}
export default UserRoute

