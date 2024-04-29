import axios from 'axios';


export async function get<T>(path: string): Promise<T> {
    const response = await axios.get(path);
    return response.data;
}
