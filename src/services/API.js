// Api.js
import axios from "axios";
import { getFingerprint } from "./fingerprinting";

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
  baseURL: process.env.API_BASE_URL, // it's not recommended to have this info here.
});

// implement a method to execute all the request from here.
const apiRequest = async (
  /** @type {string} */ method,
  /** @type {any} */ url,
  /** @type {any} */ request,
  /** @type {any} */ signal
) => {
  const iid = await getFingerprint(); //

  const headers = {
    authorization: `Bearer `,
    "Content-Type": "application/json",
    "x-device-id": iid,
  };
  //using the axios instance to perform the request that received from each http method
  return axiosAPI({
    method,
    url,
    data: request,
    headers,
    signal: signal
  })
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

// function to execute the http get request
const get = (/** @type {any} */ url, /** @type {any} */ request) =>
  apiRequest("get", url, request);

// function to execute the http delete request
const deleteRequest = (/** @type {any} */ url, /** @type {any} */ request) =>
  apiRequest("delete", url, request);

// function to execute the http post request
const post = (/** @type {any} */ url, /** @type {any} */ request, /** @type {any} */ signal) =>
  apiRequest("post", url, request, signal);

// function to execute the http put request
const put = (/** @type {any} */ url, /** @type {any} */ request) =>
  apiRequest("put", url, request);

// function to execute the http path request
const patch = (/** @type {any} */ url, /** @type {any} */ request) =>
  apiRequest("patch", url, request);

// expose your method to other services or actions
const API = {
  get,
  delete: deleteRequest,
  post,
  put,
  patch,
};
export default API;
