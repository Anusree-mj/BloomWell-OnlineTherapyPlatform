import config from "@/config";
interface ApiOptions {
    method: string;
    endpoint: string;
    body?: any;
}

export const apiCall = async ({ method, endpoint, body = {} }: ApiOptions) => {

    const res = await fetch(`${config.SERVER_AP_URL}/${endpoint}`, {
        method: method,
        body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};
