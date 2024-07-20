import { ClientItem } from "@/store/clients/type";
import { TherapistItem } from "@/store/therapists/type";
import { AdminItem } from "@/store/admin/type";

export const adminAuth = (): { status: 'ok' | 'nok'; adminData?: AdminItem; message?: string } => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
        const parsedData = JSON.parse(adminData);
        return { status: 'ok', adminData: parsedData }
    } else {
        return { status: 'nok', message: 'Admin not found' }
    }
}

export const clientAuth = (): { status: 'ok' | 'nok'; clientDetails?: ClientItem; message?: string } => {
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

export const therapistAuth = (): { status: 'ok' | 'nok'; therapistData?: TherapistItem; message?: string } => {
    console.log('reached auth')
    const therapistData = localStorage.getItem("therapistData");
    if (therapistData) {
        const parsedData = JSON.parse(therapistData);
        if (!parsedData.isBlocked) {
            console.log('sending status ok')
            return { status: 'ok', therapistData: parsedData }

        } else {
            console.log('sending status nok')

            return { status: 'nok', message: 'User is blocked' }
        }
    } else {
        console.log('sending status nok')

        return { status: 'nok', message: 'User not found' }
    }
}