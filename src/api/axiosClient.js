import axios from 'axios'

const axiosClient = axios.create({
   baseURL:"https://api.ezfrontend.com",
   headers:{
      'Content-Type': 'application/json'
   },
})

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(response => {
  return response;
}, function (error) {

  
  const {data, config, status} = error.response
  if(config.url === '/auth/local/register' && status === 400) {
    const errorList = data.data || []
    const firstError = errorList.length > 0 ? errorList[0] : {}
    const messageList = firstError.messages || []
    const firstMessage = messageList.length > 0 ? messageList[0] :{}

    console.log('ERROR response', messageList);
    console.log('ERROR firstError', firstError);
    throw new Error(firstMessage.message)
  }
  
  return Promise.reject(error.response);
});

export default axiosClient