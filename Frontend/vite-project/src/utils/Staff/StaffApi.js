import axios from"axios"

export const StaffApi=axios.create({

    baseURL: 'http://localhost:3001/staff/'
})

StaffApi.interceptors.request.use(
    function(config){
       
       const token=localStorage.getItem("staffToken")
       console.log(token);
       config.headers.Authorization=`Bearer ${token}`
       return config;
    },function(error){
       return Promise.reject(error);
    }
  )