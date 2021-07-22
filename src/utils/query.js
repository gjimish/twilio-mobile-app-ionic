import axios from 'axios';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import { logOutIfRequestUnauthenticated } from '../actions/authActions';

function query({ url, method = 'get', data, dispatch }) {

  return axios.request({
    url: url,
    method: method.toUpperCase(),
    data: data,
    params: data,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'indices' })
  }).then(res => {
    return res
  }).catch(err => {
    logOutIfRequestUnauthenticated(err, dispatch)
  });
};

export default query;
