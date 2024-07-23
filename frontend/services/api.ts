import axios, { AxiosError } from 'axios';

interface ApiOptions {
    method: string;
    endpoint: string;
    body?: any;
}

export const apiCall = async ({ method, endpoint, body = {} }: ApiOptions) => {
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

    try {
        const response = await axios({
            method: method,
            url: `${apiUrl}/${endpoint}`,
            data: method !== 'GET' && body ? body : undefined,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true // Include cookies with the request
        });

        return response.data;
    } catch (error) {
        // Handle AxiosError
        if (axios.isAxiosError(error)) {
            console.error('API call error:', error.response?.data || error.message);
        } else {
            // Handle other types of errors
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};
