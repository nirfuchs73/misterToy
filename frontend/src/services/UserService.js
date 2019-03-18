// import axios from 'axios';
import Axios from 'axios';
var axios = Axios.create({ withCredentials: true });

export default {
    login,
    logOut,
    getLoggedInUser
}
// var toys = [];
var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

const BASE_URL = process.env.NODE_ENV !== 'development'
    ? ''
    : '//localhost:3003'

function login(user) {
    console.log('user', user);
    var api = `${BASE_URL}/login`;
    return axios.put(api, user)
        .then(res => {
            loggedInUser = res.data;
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            return res.data;
        });
}

function logOut() {
    var api = `${BASE_URL}/logout`;
    return axios.get(api).then(res => {
        localStorage.removeItem('loggedInUser');
        loggedInUser = null;
        return res.data;
    });
}

function getLoggedInUser() {
    return loggedInUser;
}