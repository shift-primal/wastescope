import axios from 'axios';
import qs from 'qs';

export const client = axios.create({
    baseURL: 'http://localhost:3000',
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});
