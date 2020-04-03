import axios from 'axios'

const instance = axios.create({
    headers: {
        'content-type': 'application/json;charset=UTF-8',
        'token': ''
    },
    baseURL: '/api',
    //timeout: 120,
    withCredentials: true // 跨域时需要带上cookie,使用with即可
})

// 添加请求拦截器,发送请求之前做某些事,请求错误时干嘛.
instance.interceptors.request.use(config=>{
    config.headers['USER-TOKEN'] = localStorage.getItem('token');  // 设置token
    return config
}, error =>{
    return Promise.reject(error);
})

// 添加响应拦截器,收到响应后应该做什么
instance.interceptors.response.use(response=>{
    if(response.status === 200){
        //console.log(response)
    }
    return response
}, error=>{
    console.log(error)
    return Promise.reject(error.response.data);
})

export default instance;