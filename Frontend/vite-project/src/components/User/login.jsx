import React,{useState}from"react";

import {userLogins} from"../../redux/userSlice"
import {useDispatch} from"react-redux"
import { useNavigate} from"react-router-dom"
import{UserApi} from"../../utils/User/userApi"

const UserLogin=()=>{
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setuseremail] = useState("");
  const [password, setuserpass] = useState("");

  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("heiiiii");
      console.log(email, password);
      console.log("token");
      const token = localStorage.getItem("adminToken");
      // console.log(token);
    //   dispatch(showLoading());
      await UserApi.post(`/userLogin`, { email, password }).then((response) => {
        console.log(response,"rrrrrrrrrrrrrr");
        // dispatch(hideLoading());
        const { name, _id, email } = response.data.user;

        dispatch(userLogins({ name, _id, email }));

        navigate("/");

        localStorage.setItem("userToken", response.data.token);

        navigate("/");
      });

    
    } catch (error) {
      console.log(error);
      alert("User Blockedm");
    }
  };
  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center h-screen bg-login-signup bg-cover overflow-hidden">
        <form  onSubmit={handleSubmit}className="flex flex-col justify-center text-center w-full max-w-md shadow-lg py-5 px-4 bg-slate-100">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="input-field"
              onChange={(e) => setuseremail(e.target.value)}
              placeholder="name@flowbite.com"
              required

            />
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
              className="input-field"
              onChange={(e) => setuserpass(e.target.value)}
              required
            />
          </div>
          {/* <div className="mb-5">
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Repeat password
            </label>
            <input
              type="password"
              id="repeat-password"
              className="input-field"
              required=""
            />
          </div> */}
          {/* <div className="flex items-start mb-5">
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
          </div> */}
          <button type="submit" className="button-style">
            Register new account
          </button>
        </form>
      </div>
    </div>
  );
}
export default UserLogin;