import { UserItem } from "../store/user/type";


// login
export const getLoginApi = async (item: UserItem) => {
    // console.log('URL:', `${process.env.NEXT_APP_SERVER_URL}`);

    const res = await fetch(`http://localhost:8000/api/users/login`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};