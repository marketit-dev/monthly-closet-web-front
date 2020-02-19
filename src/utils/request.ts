import axios from 'axios';
import qs, { ParsedUrlQueryInput } from 'querystring';
import { REST_API_LOCAL_URL } from '../config/constants';

export default function request(url: string, method = 'get', query?: ParsedUrlQueryInput, data?: any, config?: any) {
    url =
        query && Object.keys(query).length
            ? `${REST_API_LOCAL_URL + url}?${qs.stringify(query)}`
            : `${REST_API_LOCAL_URL + url}${qs.stringify(query)}`;
    return axios({
        method,
        url,
        data,
        ...config,
    })
        .then(response => {
            if (response.status !== 200) {
                throw response;
            }
            return response.data;
        })
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('error.response.data', error.response.data);
                console.log('error.response.status', error.response.status);
                console.log('error.response.headers', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('error.request', JSON.stringify(error));
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('etc error', error);
            }
            alert(error.message);
            return Promise.reject(error);
        });
}
