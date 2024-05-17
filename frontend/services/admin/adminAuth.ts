import { AdminItem } from "@/store/type";

// signup
export const getAdminLoginApi = async (item: AdminItem) => {
    // console.log('URL:', `${process.env.NEXT_APP_SERVER_URL}`);

    const res = await fetch(`http://localhost:8000/admin/login`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};

// getClients details
export const getClientssDetailsApi = async () => {
    const res = await fetch(`http://localhost:8000/admin/clients/view`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};

// getTherapists details
export const getTherapistsDetailsApi = async () => {
    const res = await fetch(`http://localhost:8000/admin/therapists/view`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};