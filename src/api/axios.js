import axios from "axios";
import qs from 'qs';

// 默认配置
const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    timeout: 10000,
    headers: {Content_type: 'application/x-www-form-urlencoded',},
});

// 请求拦截器
instance.interceptors.request.use(function(config) {
    // 在请求发出前做些操作
    config.data = qs.stringify(config.data)
    return config;
},function(error){
    console.log(error)
    // 对请求错误做些操作
    return Promise.resolve(error);
})

// 响应拦截器
instance.interceptors.response.use(function(response){
    // 对响应数据做操作
    return response
},function(error){
    console.log(error)
    // 对响应错误做些操作
    return Promise.resolve(error);
})

// 封装请求
async function requests(config) {
    let {status, data = {}, statusText, message} = await instance(config);
    // debugger
    if(200 <= status && status < 300) {// 请求成功
        // 
    }else if(status == 401){// 请求失败
         // 未登录
    }else{
        // statusText
        data.msg = statusText || message || 'request error';
    }
    return data;
}


export default requests;