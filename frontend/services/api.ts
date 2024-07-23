interface ApiOptions {
    method: string;
    endpoint: string;
    body?: any;
}

export const apiCall = async ({ method, endpoint, body = {} }: ApiOptions) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

        const res = await fetch(`${apiUrl}/${endpoint}`, {
            method: method,
            body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! status: ${res.status}, message: ${errorData.message || 'Unknown error'}`);
        }

        return await res.json();
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
};

