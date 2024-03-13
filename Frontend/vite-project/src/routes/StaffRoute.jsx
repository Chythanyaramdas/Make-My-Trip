import React from "react";
import{Route,Routes} from"react-router-dom"
import Register from "../pages/Staff/StaffRegister";
import StaffLogin from "../pages/Staff/StaffLogin";
const staffRoute=()=>{
    return(
        <Routes>
                 <Route exact path='/register' element={<Register/>} />
                 <Route exact path='/staffLogin' element={<StaffLogin/>} />
        </Routes>
    )
}
export default staffRoute