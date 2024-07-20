'use-client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from "next/navigation";
import { Box, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { getRejectedTherapistsDetailsAction, adminStateType } from "@/store/admin/adminReducer";
import TableComponent from "@/components/common/tableComponent";


const RejectedTherapistsComponent = () => {
    const dispatch = useDispatch();
    const therapists = useSelector((state: { admin: adminStateType }) => state.admin.therapists);
    const router = useRouter()

    useEffect(() => {
        dispatch(getRejectedTherapistsDetailsAction());
    }, []);

    const columns: GridColDef[] = [
        { field: "slNo", headerName: "No", width: 10 },
        { field: "name", headerName: "Name", width: 120 },
        { field: "email", headerName: "Email", width: 150 },
        { field: "reason", headerName: "Rejected Reason", width: 230 },
        {
            field: "addReason",
            headerName: "Add Reason",
            sortable: false,
            width: 90,
            renderCell: (params) => (
                params.row.reason ? (
                    <Typography sx={{ color: 'gray', mt: '0.8rem' }}>Added</Typography>
                ) : (
                    <Link href={`/admin/therapists/rejected/addReason/${params.row.id}`} style={{ textDecoration: 'underline' }}>
                        ADD
                    </Link>
                )
            ),
        },
    ];
    const rows = therapists.map((therapist, index) => ({
        id: therapist._id,
        slNo: index + 1,
        name: therapist.name,
        email: therapist.email,
        reason: therapist.reasonForRejection,
        addReason: 'ADD',
    }));
    const head = 'Verify Therapist';
    const subHead = [
        { name: 'All', url: 'admin/therapists/verify', select: false },
        { name: 'Rejected', url: 'admin/therapists/rejected', select: true }
    ]

    return (
        <Box sx={{
            ml: { xs: 'none', sm: '15rem' }, mt: 5
        }}>
            <TableComponent rows={rows} columns={columns} head={head} subHead={subHead} role="admin" />
        </Box>
    );
}
export default RejectedTherapistsComponent