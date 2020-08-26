import Axios from 'axios';

const apiServer = 'http://localhost:4000/'

const axios = (method, url, data) => {
    return Axios({
        method,
        url: apiServer + url,
        data,
    })
        .then(res => {
            res.data
        })
        .catch(err => {
            console.log(err);
        })
}

export default axios;