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

const verifyOptions = [
    'Accept',
    'Reject',
];

const AdminConnectionRequestsComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const [search, setSearch] = useState<string>('');
    const [verifystatus, setVerifyStatus] = useState('')
    const connections = useSelector((state: {
        adminConnectionRequests: connectionStateType
    }) => state.adminConnectionRequests.connections);

    useEffect(() => {
        const therapistData = localStorage.getItem("therapistData");
        if (therapistData) {
            dispatch(getAdminConnectionRequestAction());
        } else {
            router.push('/login')
        }
    }, []);


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
    };


    const columns: GridColDef[] = [
        { field: "no", headerName: "No", width: 10 },
        { field: "clientName", headerName: "Client Name", width: 100 },
        {
            field: "viewClient",
            headerName: "Client",
            sortable: false,
            width: 80,
            renderCell: (params) => (
                <Link href={`/client/view/${params.row.clientId}`} style={{ textDecoration: 'underline' }}
                >View
                </Link>
            ),
        },
        { field: "therapistName", headerName: "Therapist Name", width: 120 },
        {
            field: "viewTherapist",
            headerName: "Therapist",
            sortable: false,
            width: 80,
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

    const filteredConnections = connections.filter(connection =>
        connection.clientId.name.toLowerCase().includes(search) ||
        connection.clientId.email.toLowerCase().includes(search) ||
        connection.status.toLowerCase().includes(search)
    );

    const rows = filteredConnections.map((connection, index) => ({
        id: connection._id,
        therapistId: connection.therapistId._id,
        connectionId: connection.clientId._id,
        no: index + 1,
        therapistName: connection.therapistId.name,
        clientName: connection.clientId.name,
        therapistStatus: connection.status,
        therapistVerificationStatus: connection.status === 'Reject' ? `Rejected,\nReason: ${connection.reasonForRejection}`
            : connection.status === 'Accept' ? 'Accepted'
                : connection.status,
        verificationStatus: connection.adminVerify,
        viewTherapist: 'view',
        viewClient: 'view'
    }));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                ml: { sm: '15rem' }
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '63rem', maxWidth: '90%',
            }}>
                <Typography variant="h6" noWrap component="div" sx={{
                    color: '#325343',
                    fontWeight: 800
                }}>
                    Connection Requests
                </Typography>
                <TextField
                    label="Search..."
                    variant="outlined"
                    value={search}
                    onChange={handleSearch}
                    sx={{ marginBottom: 2, }}
                />
            </Box>
            <Box
                sx={{
                    height: 400,
                    width: '90%',
                    maxWidth: '100%',
                    border: '1px solid green',
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    sx={{
                        '& .MuiDataGrid-cell': {
                            fontSize: '0.88rem',
                        },
                    }}
                />
            </Box>


        </Box>
    );
}
export default AdminConnectionRequestsComponent