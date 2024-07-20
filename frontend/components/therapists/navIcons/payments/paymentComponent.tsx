'use-client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GridColDef } from '@mui/x-data-grid';
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { getTherapistsAllPaymentAction, ActivitiesStateType } from "@/store/therapists/therapistActvitiesHandlerReducers";
import TableComponent from "@/components/common/tableComponent";
import { format } from 'date-fns';


const TherapistEarningsComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const payments = useSelector((state: {
        therapistActivities: ActivitiesStateType
    }) => state.therapistActivities.payments);

    useEffect(() => {
        dispatch(getTherapistsAllPaymentAction());
    }, []);

    const columns: GridColDef[] = [
        { field: "no", headerName: "No", width: 10 },
        { field: "amount", headerName: "Amount", width: 120 },
        { field: "creditedAt", headerName: "Credited At", width: 150 },
    ];
    const rows = payments.map((payment, index) => ({
        id: payment._id,
        no: index + 1,
        amount: `₹ ${payment.totalAmount}/-`,
        creditedAt: format(new Date(payment.updatedAt), "do MMMM yyyy")
    }));
    const head = 'Earnings';

    return (
        <Box sx={{
            backgroundColor: '#325343', pb: 8
        }}>
            <TableComponent rows={rows} columns={columns} head={head} subHead={[]} role="" />
        </Box>
    );
}
export default TherapistEarningsComponent