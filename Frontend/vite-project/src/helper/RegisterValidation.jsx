export default function Validation(values){
    let error={}
    const email_pattern=/^[^\s@]+@[^\s@]+\.[a-zA-Z0-9.-]+$/
    const password_pattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]{4,10}$/

    if(!values.name.trim()){
        error.name='Please Enter Name Field'
    }
     if(values.email.trim()==""){
        error.email="Please Enter Email Field"
     }
     else if(!email_pattern.test(values.email)){
        error.email="Enter the correct format like example@gmai.com "
     }

     if(!values.phone){
        error.phone="Enter the phone number"
     }
     if(values.password.trim()==""){
        error.password="Please Enter the Password"
     }
     else if(!password_pattern.test(values.password)){
        error.password="password need a format"
     }

     if(!values.confirmPassword.trim()){
        error.confirmPassword="Confirm Password required"
     }
     else if(values.confirmPassword !==values.password){
        error.confirmPassword="Password didn't match"
     }
    return error
}