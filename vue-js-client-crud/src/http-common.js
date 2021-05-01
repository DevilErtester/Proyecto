import axios from "axios";
// import router from './router.js'
// axios.defaults.withCredentials  =true; // set cross domain and access permission to allow cookie information to be carried across domains

// axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.put['Content-Type'] = 'application/json'
export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true,
});

// axios.interceptors.request.use(
//   config => {
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
// axios.interceptors.response.use(
//   response => {
//     //Not logged in or session expired
//     if ('401' === response.data.code) {
//       //Redirect to login page
//       router.replace({
//         path: '/login',
//         query: {redirect: router.currentRoute.fullPath}
//       })
//     }
//     return response;
//   },
//   error => {
//     if (500 === error.response.status) {
//       //Server exception  
//     }
//     return  Promise.reject (error) // returns the error information returned by the interface
//   }
// );
