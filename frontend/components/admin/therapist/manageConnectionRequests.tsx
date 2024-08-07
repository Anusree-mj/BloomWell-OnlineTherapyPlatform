'use-client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import FormHelperText from '@mui/material/FormHelperText';
import { useRouter } from "next/navigation";
import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { getAdminConnectionRequestAction, connectionStateType } from "@/store/admin/adminConnectionReducer";
import { manageConnectionRequest } from "@/utilities/admin/therapists/manageConnections";
import { connect } from "http2";
import TableComponent from "@/components/common/tableComponent";

const verifyOptions = [
    'Accept',
    'Reject',
];

const AdminConnectionRequestsComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const [verifystatus, setVerifyStatus] = useState('')
    const connections = useSelector((state: {
        adminConnectionRequests: connectionStateType
    }) => state.adminConnectionRequests.connections);

    useEffect(() => {
        dispatch(getAdminConnectionRequestAction());
    }, []);
    const columns: GridColDef[] = [
        { field: "no", headerName: "No", width: 10 },
        { field: "clientName", headerName: "Client Name", width: 100 },
        {
            field: "viewClient",
            headerName: "Client",
            sortable: false,
            width: 80,
            renderCell: (params) => (
                <Link href={`/client/medicalInfo/${params.row.clientId}`} style={{ textDecoration: 'underline' }}
                >View
                </Link>
            ),
        },
        { field: "therapistName", headerName: "Therapist Name", width: 120 },
        {
            field: "viewTherapist",
            headerName: "Therapist",
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <Link href={`/therapist/view/${params.row.therapistId}`} style={{ textDecoration: 'underline' }}
                >View
                </Link>
            ),
        },
        { field: "therapistVerificationStatus", headerName: "Therapist Verification Status", width: 240 },
        { field: "verificationStatus", headerName: "Status", width: 90 },
        {
            field: "verify",
            headerName: "Verify",
            sortable: false,
            width: 160,
            renderCell: (params) => (
                <Box sx={{
                    m: 1, minWidth: 100, border: 'none', outline: 'none',
                }}>
                    <Select sx={{
                        outline: 'none', border: 'none',
                        fontSize: '0.88rem', padding: 0
                    }}
                        value={verifystatus}
                        onChange={(e) => manageConnectionRequest(params.row.id, params.row.therapistName,
                            params.row.clientName, e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        disabled={params.row.verificationStatus !== 'pending' || params.row.therapistStatus === 'Reject'}
                    >
                        <MenuItem value="" sx={{ fontSize: '0.88rem' }}>
                            <em>None</em>
                        </MenuItem>
                        {verifyOptions.map((option) => (
                            <MenuItem key={option} value={option}
                                sx={{ fontSize: '0.88rem' }}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Without label</FormHelperText>
                </Box>
            ),
        },
    ];
    const rows = connections.map((connection, index) => ({
        id: connection?._id || 'no-id',
        therapistId: connection?.therapistId?._id || 'no-id',
        clientId: connection?.clientId?._id || 'no-id',
        no: index + 1,
        therapistName: connection?.therapistId?.name || 'Unknown',
        clientName: connection?.clientId?.name || 'Unknown',
        therapistStatus: connection?.status || 'Unknown',
        therapistVerificationStatus: connection?.status === 'Reject'
            ? `Rejected,\nReason: ${connection?.reasonForRejection || 'No reason provided'}`
            : connection?.status === 'Accept'
                ? 'Accepted'
                : connection?.status || 'Unknown',
        verificationStatus: connection?.adminVerify || 'Unknown',
        viewTherapist: 'view',
        viewClient: 'view'
    }));

    const head = 'Manage Connections';

    return (
        <Box sx={{
            ml: { xs: 'none', sm: '15rem' }, mt: 5
        }}>
            <TableComponent rows={rows} columns={columns} head={head} subHead={[]} role="admin" />
        </Box>
    );
}
export default AdminConnectionRequestsComponent