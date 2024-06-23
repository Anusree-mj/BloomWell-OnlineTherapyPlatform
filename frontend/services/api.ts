interface ApiOptions {
    method: string;
    endpoint: string;
    body?: any;
}

export const apiCall = async ({ method, endpoint, body = {} }: ApiOptions) => {
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL

    const res = await fetch(`${apiUrl}/${endpoint}`, {
        method: method,
        body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};
