import { apiRoot } from "../api/routesBuilder";
import axios, { AxiosRequestConfig } from 'axios'

export const jsonFetch = async (path: string, options?: AxiosRequestConfig): Promise<any> => {
  options = {
    url: `${apiRoot}${path}`,
    headers: { Authentication: localStorage.getItem('token') },
    ...options
  }

  return (await axios.request(options)).data
}
