import axios from './http'

var tw_request = {};

tw_request.get = function({url, config={}, cb}){
    axios.get(url, config).then((res)=>{
        if(res.status === 200){
            let result = res.data;
            cb(result)
        }
    }).catch((error)=>{
        console.log('请求错误:' + error);
    })
};

tw_request.post = function({url, data, cb}){
    axios.post(url, data).then((res)=>{
        if(res.status === 200){
            let result = res.data;
            cb(result);
        }
    }).catch((error)=>{
        console.log(error);
    })
};

tw_request.put = function({url, data, cb}){
    axios.put(url, data).then((res)=>{
        if(res.status === 200){
            let result = res.data;
            cb(result);
        }
    }).catch((error)=>{
        console.log(error);
    })
};

tw_request.delete = function({url, config={}, cb}){
    axios.delete(url, config).then((res)=>{
        if(res.status === 200){
            let result = res.data;
            cb(result)
        }
    }).catch((error)=>{
        console.log('请求错误:' + error);
    })
};


export default ()=>{
    window.tw_request = tw_request;
}