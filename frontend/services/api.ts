interface ApiOptions {
    method: string;
    endpoint: string;
    body?: any;
}

export const apiCall = async ({ method, endpoint, body = {} }: ApiOptions) => {
    // console.log('URL:', `${process.env.NEXT_APP_SERVER_URL}`);

    const res = await fetch(`http://localhost:8000/${endpoint}`, {
        method: method,
        body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};
