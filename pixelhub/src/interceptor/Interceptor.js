import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'


const baseURL = 'https://pixel-hub.online'
const access = localStorage.getItem('access_token')

const CancelToken = axios.CancelToken;
const source = CancelToken.source();


const PrivateAxios = axios.create({
    baseURL:baseURL
});

PrivateAxios.interceptors.request.use(async req => {
    
    console.log('Request:', req);
    const user = jwt_decode(localStorage.getItem('access_token'))
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (isExpired){
        console.log('false');
    }else{
        console.log('true');
        console.log(localStorage.getItem('access_token'));
        req.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

    }
    if(!isExpired)  return req
    console.log(localStorage.getItem('refresh_token'));

    try {
        const response = await axios.post(
          `${baseURL}/token/refresh/`,
          {
            "refresh": localStorage.getItem('refresh_token'),
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            cancelToken: source.token, 
          }
        );
    
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        req.headers.Authorization = `Bearer ${response.data.access}`;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error refreshing the token:', error);
        }
      }
      return req;
    })


export default PrivateAxios;