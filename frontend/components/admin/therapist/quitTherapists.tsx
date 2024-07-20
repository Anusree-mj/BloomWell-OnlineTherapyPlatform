'use-client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from "next/navigation";
import { Box, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { getTherapistsWhoQuitAction, adminStateType } from "@/store/admin/adminReducer";
import TableComponent from "@/components/common/tableComponent";


const AdminTherapistsQuitComponent = () => {
    const dispatch = useDispatch();
    const therapists = useSelector((state: { admin: adminStateType }) => state.admin.therapists);
    const router = useRouter()

    useEffect(() => {
        dispatch(getTherapistsWhoQuitAction());
    }, []);

    const columns: GridColDef[] = [
        { field: "slNo", headerName: "No", width: 10 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "reason", headerName: "Reason For Quiting", width: 230 },
        {
            field: "payment",
            headerName: "Check Payment",
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <Link href={'#'} style={{ textDecoration: 'underline' }}
                //  href={`/admin/therapists/rejected/addReason/${params.row.id}`} 
                >
                    Payment Details
                </Link>
            ),
        },
    ];
    const rows = therapists.map((therapist, index) => ({
        id: therapist._id,
        slNo: index + 1,
        name: therapist.name,
        reason: therapist.reasonForQuiting ? therapist.reasonForQuiting : '',
        payment: 'Payment Details',
    }));
    const head = 'Therapists who quit';

    return (
        <Box sx={{
            ml: { xs: 'none', sm: '15rem' }, mt: 5
        }}>
            <TableComponent rows={rows} columns={columns} head={head} subHead={[]} role="admin" />
        </Box>
    );
}
export default AdminTherapistsQuitComponent