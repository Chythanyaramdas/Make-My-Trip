import React,{useEffect, useState,useRef} from "react";
import {useNavigate}from"react-router-dom";
import Validation from"../../helper/RegisterValidation"
import { UserApi } from "../../utils/User/userApi";

const userRegister=()=>{
  const initialValues={
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    otp:"",
  }
  const isMounted = useRef(true);
    const [activeSlide, setActiveSlide] = useState(0);
    const [formValues,setFormValues]=useState(initialValues);
    const[message,setMessage]=useState("")
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[confirmPassword,setConfirmPassword]=useState("")

    const[formError,setFormError]=useState({})
    const[submit,setSubmit]=useState(false);

    const[otp1,setOtp1]=useState(0);
    const[otp2,setOtp2]=useState(0);
    const[otp3,setOtp3]=useState(0);
    const[otp4,setOtp4]=useState(0);
    const[otp5,setOtp5]=useState(0);
    const[otp6,setOtp6]=useState(0);

    const [enteredOtp, setEnteredOtp] = useState("");
    const [otp, setOtp] = useState(false);
    const navigate = useNavigate();



    const handleConfirm = () => {
      const result = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
  
      console.log(formValues);
      UserApi.post("/verify_otp", { ...formValues, result }).then((response) => {
        console.log(response);
        if (response.data.message === "Authenticated") {
  
          navigate("/login");
        } else {
          console.log("invalid otp");
        }
      })
    };



    const generateError = (err) => {
      toast.error(err, {
        position: "top-center",
      });
    };

    const handleChange=(e)=>{
      const{name,value}=e.target
      console.log(`Updating ${name} with value: ${value}`);
      setFormValues((prev)=>{
        return{
          ...prev,
          [name]:value
        }
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setFormError(Validation(formValues, "register"));
      setSubmit(true);
      
    }

    useEffect(()=>{
      
      if(Object.keys(formError).length ===0 && submit){
        UserApi.post("/register",{
          ...formValues,
          
        })
        .then((response)=>{
          if(response.data.status){
            setOtp(true);
          }
        })
        .catch((error)=>{
          console.log("error");
          alert('Already existed')
        })
      }
      return()=>{
        console.log("unmountedssssssssssssssssss");
      };
    },[formError])

    return(
        <>
          {!otp && ( 
  <div id="indicators-carousel" className="relative w-full h-screen" data-carousel="static">
    {/* Carousel wrapper */}
    <div className="relative h-full overflow-hidden rounded-lg">
      {/* Item 1 */}
      <div className={activeSlide === 0 ? 'block' : 'hidden'} data-carousel-item="active">
        <img
          src="https://wallpapers.com/images/hd/top-of-mountain-hiking-ssuknid9vlyemcl4.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="..."
        />
      </div>
      {/* Item 2 */}
      <div className={activeSlide === 1 ? 'block' : 'hidden'} data-carousel-item="">
        <img
          src="https://wallpapers.com/images/hd/hiking-silhouette-reflection-1m7nhwkt9e5nqhbp.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="..."
        />
      </div>
      {/* Item 3 */}
      <div className={activeSlide === 2 ? 'block' : 'hidden'} data-carousel-item="">
        <img
          src="https://images.unsplash.com/photo-1465310477141-6fb93167a273?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWR2ZW50dXJlJTIwc3BvcnRzfGVufDB8fDB8fHww"
          className="absolute inset-0 w-full h-full object-cover"
          alt="..."
        />
      </div>
      {/* Item 4 */}
      <div className={activeSlide === 3 ? 'block' : 'hidden'} data-carousel-item="">
        <img
          src="https://cutewallpaper.org/22/hiker-wallpapers/1036811343.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="..."
        />
      </div>
      {/* Item 5 */}
      <div className={activeSlide === 4 ? 'block' : 'hidden'} data-carousel-item="">
        <img
          src="https://wallpapers.com/images/hd/hiking-1599-x-1125-background-zkj2a4kcolvmop1p.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="..."
        />
      </div>
      <div className="absolute top-10 left-0 w-full text-center text-4xl font-serif text-white z-50">
        "The Best View Comes After Hardest Climb"
      </div>
      {/* Form */}
      <form  onSubmit={handleSubmit} className="absolute inset-0 flex flex-col justify-center text-center w-full max-w-md shadow-lg py-5 px-4 bg-slate-200 z-40">
      
  {/* Outer Box */}
  <div className="flex flex-col items-center bg-blue-200">
  <div className=" text-center text-3xl font-serif text-red-800 z-50">
        Make Your Trip
      </div>
    {/* First Section: Email and Password */}
    <div className="mb-5 mt-8">
      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
         Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formValues.name}
        className="input-field"
        placeholder="your name"
        onChange={handleChange}
        required
      />
      {formError.name && (
                <p style={{ color: "red" }}>{formError.name}</p>
              )}
    </div>
    <div className="mb-5 mt-8">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formValues.email}
        className="input-field"
        placeholder="name@flowbite.com"
        onChange={handleChange}
        required
      />
       {formError.email && (
                <p style={{ color: "red" }}>{formError.email}</p>
              )}
    </div>
    <div className="mb-5">
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        minLength={6}
        value={formValues.password}
        className="input-field"
        onChange={handleChange}
        required
      />
      {formError.password && (
                    <p style={{ color: "red" }}>{formError.password}</p>
                  )}
    </div>

    {/* Second Section: Confirm Password */}
    <div className="mb-5">
      <label
        htmlFor="repeat-password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Repeat password
      </label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formValues.confirmPassword}
        className="input-field"
        onChange={handleChange}
        required
      />
        {formError.confirmPassword && (
                <p style={{ color: "red" }}>{formError.confirmPassword}</p>
              )}
    </div>

    {/* Third Section: Checkbox */}
    <div className="flex items-start mb-5">
      <div className="flex items-center h-5">
        <input
          id="terms"
          type="checkbox"
          defaultValue=""
          className="checkbox-field"
          required=""
        />
      </div>
      <label
        htmlFor="terms"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        I agree with the{" "}
        <a
          href="#"
          className="text-blue-600 hover:underline dark:text-blue-500"
        >
          terms and conditions
        </a>
      </label>
    </div>

    {/* Fourth Section: Register Button */}
    <button type="submit" className="button-style">
      Register new account
    </button>
  </div>
</form>

    </div>
    {/* Slider indicators */}
    <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
      <button
        type="button"
        className={`w-3 h-3 rounded-full ${activeSlide === 0 ? 'bg-white' : 'bg-gray-500'}`}
        aria-current="true"
        aria-label="Slide 1"
        onClick={() => setActiveSlide(0)}
      ></button>
      <button
        type="button"
        className={`w-3 h-3 rounded-full ${activeSlide === 1 ? 'bg-white' : 'bg-gray-500'}`}
        aria-current="false"
        aria-label="Slide 2"
        onClick={() => setActiveSlide(1)}
      ></button>
      <button
        type="button"
        className={`w-3 h-3 rounded-full ${activeSlide === 2 ? 'bg-white' : 'bg-gray-500'}`}
        aria-current="false"
        aria-label="Slide 3"
        onClick={() => setActiveSlide(2)}
      ></button>
      <button
        type="button"
        className={`w-3 h-3 rounded-full ${activeSlide === 3 ? 'bg-white' : 'bg-gray-500'}`}
        aria-current="false"
        aria-label="Slide 4"
        onClick={() => setActiveSlide(3)}
      ></button>
      <button
        type="button"
        className={`w-3 h-3 rounded-full ${activeSlide === 4 ? 'bg-white' : 'bg-gray-500'}`}
        aria-current="false"
        aria-label="Slide 5"
        onClick={() => setActiveSlide(4)}
      ></button>
    </div>
    {/* Slider controls */}
    <button
      type="button"
      className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-prev=""
      onClick={() => setActiveSlide((activeSlide - 1 + 5) % 5)}
    >
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg
          className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
        </svg>
        <span className="sr-only">Previous</span>
      </span>
    </button>
    <button
      type="button"
      className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-next=""
      onClick={() => setActiveSlide((activeSlide + 1) % 5)}
    >
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg
          className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
        </svg>
        <span className="sr-only">Next</span>
      </span>
    </button>
  </div>

        )}

{otp && (
        <div className="bg-slate-500 w-full h-screen text-center flex flex-col justify-center ">
          <h1>ENTER OTP</h1>
          <div className="userInput">
            <input
              type="text"
              id="ist"
              maxLength="1"
              onChange={(e) => setOtp1(e.target.value)}
            />
            <input
              type="text"
              id="sec"
              maxLength="1"
              onChange={(e) => setOtp2(e.target.value)}
            />
            <input
              type="text"
              id="third"
              maxLength="1"
              onChange={(e) => setOtp3(e.target.value)}
            />
            <input
              type="text"
              id="fourth"
              maxLength="1"
              onChange={(e) => setOtp4(e.target.value)}
            />
            <input
              type="text"
              id="fifth"
              maxLength="1"
              onChange={(e) => setOtp5(e.target.value)}
            />
            <input
              type="text"
              id="sixth"
              maxLength="1"
              onChange={(e) => setOtp6(e.target.value)}
            />
          </div>
          <button onClick={handleConfirm}> CONFIRM</button>
        </div>
      )}
  
</>

    )
}
export default userRegister