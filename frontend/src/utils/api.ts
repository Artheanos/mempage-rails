import { apiRoot } from '../api/routesBuilder'
import axios, { AxiosRequestConfig } from 'axios'

export const jsonFetch = async(path: string, options?: AxiosRequestConfig): Promise<any> => {
  options = {
    url: `${apiRoot}${path}`,
    headers: { Authentication: JSON.parse(localStorage.getItem('user') || '{}').token },
    ...options,
  }

  return (await axios.request(options)).data
}

export const serverToFormErrors = (errors: any) => {
  const result: Record<string, any> = {}
  for (const key in errors) result[key] = { type: 'idk', message: errors[key][0] }
  return result
}

export const merge = (a: any, b: any) => {
  const result: Record<string, any> = {}

  for (let key in a) {
    const value = a[key]
    if (typeof b[key] === 'object' && typeof value === 'object') {
      result[key] = merge(a[key], b[key])
    } else {
      result[key] = a[key]
    }
  }

  for (let key in b) {
    if (!result.hasOwnProperty(key)) result[key] = b[key]
  }

  return result
}
