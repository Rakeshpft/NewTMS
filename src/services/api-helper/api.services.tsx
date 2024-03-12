import axios, { AxiosResponse } from "axios";
import lscache from "lscache";
import { API_DEFAULT_OPTIONS, getAPIConfig } from "./api.constant";


const get = async (endpoint: string) => {
    const res: AxiosResponse = await axios.get(`${API_DEFAULT_OPTIONS.apiURL}${endpoint}`, getAPIConfig());
    return res.data;
  };

const post = async (endpoint: string, payload?: any) => {
    const res : AxiosResponse = await axios.post(`${API_DEFAULT_OPTIONS.apiURL}${endpoint}`, payload, getAPIConfig());
    return res.data ;
}

const put = async ( endpoint : string , payload : any ) => {
  
    const res : AxiosResponse = await axios.put(`${API_DEFAULT_OPTIONS.apiURL}${endpoint}`, payload, getAPIConfig());
    return res.data  ;
}
const postFormData = async ( endpoint : string , payload : any) => {
  const res : AxiosResponse = await axios.post(`${API_DEFAULT_OPTIONS.apiURL}${endpoint}`, payload, {
    headers: {
      Authorization: "Bearer " + lscache.get("auth")?.data.access_token,
      'Content-Type': 'multipart/form-data',
      'Accept':'application/json'   
    },
  });
  return res.data ;
}
const del = async (endpoint: string, payload?: any) => {
    const res: AxiosResponse = await axios.delete(`${API_DEFAULT_OPTIONS.apiURL}${endpoint}`, {
      headers: {
        // Token: lscache.get('auth')?.data.access_token,
        Authorization: "Bearer " + lscache.get("auth")?.data.access_token,
        'Content-Type': 'application/json',
      },
      data: payload,
    });
    return res.data;
  };
  

  export const API = { get , post , put , del , postFormData }; ;




