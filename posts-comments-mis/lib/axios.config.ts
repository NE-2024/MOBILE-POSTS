import _ from "axios";

export const axios = _.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 5000,// 5 seconds
});
