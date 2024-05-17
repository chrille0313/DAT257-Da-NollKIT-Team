import axios, { AxiosRequestConfig } from 'axios';

export async function get<T>(url: string, params?: AxiosRequestConfig['params']): Promise<T> {
    const response = await axios.get(url, { params });
    return response.data;
}
