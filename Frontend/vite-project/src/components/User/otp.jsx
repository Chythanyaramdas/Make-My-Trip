import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../utils/User/userApi";

const UserOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    if (/^\d$/.test(value)) {
      setOtp((prevOtp) => {
        const newOtp = prevOtp.split("");
        newOtp[index] = value;
        return newOtp.join("");
      });
    }
  };

  const handleConfirm = async () => {
    try {
      const result = parseInt(otp, 10); // Convert to number

      const response = await UserApi.post("/verify_otp", { result });

      if (response.data.message === "Authenticated") {
        navigate("/login");
      } else {
        console.log("Invalid OTP");
        // Handle invalid OTP case here (e.g., display error message)
      }
    } catch (error) {
      console.error("API error:", error);
      // Handle API errors (e.g., display user-friendly message)
    }
  };

  

  return (
    <div className="bg-slate-500 w-full h-screen text-center flex flex-col justify-center">
      <h1>ENTER OTP</h1>
      <div className="userInput">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={otp[index] || ""} // Ensure value is displayed
            onChange={(e) => handleOtpChange(index, e.target.value)}
          />
        ))}
      </div>
      <button onClick={handleConfirm}>CONFIRM</button>
    </div>
  );
};

export default UserOtp;

