import React from "react";

const userLogin=()=>{
    return(
      
      <div className="min-h-screen">
  <div className="flex justify-center items-center h-screen bg-login-signup bg-cover overflow-hidden">
    <form className="flex flex-col justify-center text-center w-full max-w-md shadow-lg py-5 px-4 bg-slate-100">
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
          placeholder="name@flowbite.com"
          required=""
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
          required=""
        />
      </div>
      <div className="mb-5">
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
      </div>
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
      <button type="submit" className="button-style">
        Register new account
      </button>
    </form>
  </div>
</div>

    )
}
export default userLogin