// import axios from 'axios';
import Axios from 'axios';
var axios = Axios.create({ withCredentials: true });

export default {
    query,
    getItemById,
    removeItem,
    addItem,
    updateItem,
    getEmpty
}
var toys = [];
const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/toy' 
    : '//localhost:3003/toy';

function query(filterQuery = '') {
    console.log(filterQuery);
    var api = `${BASE_URL}?${filterQuery}`;
    return axios.get(api)
        .then(res => res.data)
        .then(loadedToys => {
            toys = loadedToys;
            // console.log(toys);
            return toys;
        });
}

function getItemById(itemId) {
    // console.log(itemId);
    var api = `${BASE_URL}/${itemId}`;
    return axios.get(api)
        .then(res => {
            // console.log(res.data);
            return res.data;
        });
}

function removeItem(itemId) {
    var api = `${BASE_URL}/${itemId}`;
    return axios.delete(api)
        .then(res => res.data);
}

function addItem(item) {
    var api = `${BASE_URL}`;
    return axios.post(api, item)
        .then(res => res.data)
        .then(addedToy => {
            console.log(addedToy);
            // toys.push(addedToy);
            return addedToy;
        });
}

function updateItem(item) {
    // console.log(item._id);
    var api = `${BASE_URL}/${item._id}`;
    return axios.put(api, item)
        .then(res => res.data)
        .then(updatedToy => {
            return updatedToy;
        });
}

function getEmpty() {
    return {
        name: '',
        price: 0,
        type: '',
        createdAt: new Date(),
        inStock: false
    }
}