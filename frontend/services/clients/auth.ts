import { ClientItem, TherapistItem } from "@/store/type";

// signup
export const getSignupApi = async (item: ClientItem) => {
    // console.log('URL:', `${process.env.NEXT_APP_SERVER_URL}`);

    const res = await fetch(`http://localhost:8000/client/signup`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};

export const getTherapistSignupApi = async (item: ClientItem) => {
    // console.log('URL:', `${process.env.NEXT_APP_SERVER_URL}`);

    const res = await fetch(`http://localhost:8000/therapist/signup`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};

export const saveTherapistDetailsApi = async (item: TherapistItem) => {
    // console.log('URL:', `${process.env.NEXT_APP_SERVER_URL}`);

    const res = await fetch(`http://localhost:8000/therapist/`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};