export const adminAuth = () => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
        return { status: 'ok', adminData }
    } else {
        return { status: 'nok', meassage: 'Admin not found' }
    }
}

export const clientAuth = () => {
    const clientData = localStorage.getItem("clientData");
    if (clientData) {
        const parsedData = JSON.parse(clientData);
        if (!parsedData.isBlocked) {
            return { status: 'ok', clientDetails: parsedData }
        } else {
            return { status: 'nok', message: 'User is blocked' }
        }
    } else {
        return { status: 'nok', message: 'User not found' }
    }
}

export const therapistAuth = () => {
    const therapistData = localStorage.getItem("therapistData");
    if (therapistData) {
        const parsedData = JSON.parse(therapistData);
        if (!parsedData.isBlocked) {
            return { status: 'ok', therapistData }
        } else {
            return { status: 'nok', message: 'User is blocked' }
        }
    } else {
        return { status: 'nok', message: 'User not found' }
    }
}