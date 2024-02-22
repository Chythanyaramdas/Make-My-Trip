import axios from "axios"


export const UserApi=axios.create({
    baseURL:'http://localhost:3001/',
})
UserApi.interceptors.request.use(
    function (config) {
       const token=localStorage.getItem("userToken")
       console.log(token);
       config.headers.Authorization=`Bearer ${token}`
      
       return config;
     }, function (error) {
       
       return Promise.reject(error);
     }
  )
