'use-client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import FormHelperText from '@mui/material/FormHelperText';
import { useRouter } from "next/navigation";
import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { getTherapistsConnectionRequestAction, connectionStateType } from "@/store/therapists/therapistConnectionHandlerReducers";
import { manageConnectionRequest } from "@/utilities/therapists/manageConnectionRequest";

const verifyOptions = [
    'Accept',
    'Reject',
];

const ConnectionRequestsComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const [search, setSearch] = useState<string>('');
    const [verifystatus, setVerifyStatus] = useState('')
    const connections = useSelector((state: {
        therapistConnectionRequests: connectionStateType
    }) => state.therapistConnectionRequests.connections);

    useEffect(() => {
        const therapistData = localStorage.getItem("therapistData");
        if (therapistData) {
            dispatch(getTherapistsConnectionRequestAction());
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
        { field: "name", headerName: "Name", width: 120 },
        { field: "email", headerName: "Email", width: 150 },
        {
            field: "medicalInfo",
            headerName: "Medical Info",
            sortable: false,
            width: 120,
            renderCell: (params) => (
                <Link href={`/client/view/${params.row.id}`} style={{ textDecoration: 'underline' }}
                >View
                </Link>
            ),
        },
        { field: "verificationStatus", headerName: "Status", width: 200 },
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
                        onChange={(e) => manageConnectionRequest(params.row.id, params.row.name, e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        disabled={params.row.verificationStatus !== 'pending' || params.row.verificationStatus !== 'Rejected by admin'}
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
        no: index + 1,
        name: connection.clientId.name,
        email: connection.clientId.email,
        verificationStatus: connection.adminVerify === 'Reject' ? 'Rejected by admin' : connection.status,
        medicalInfo: 'view',
    }));

    const handleGetRejectedLists = () => {
        router.push('/therapist/dashboard/connections/rejected')
    }

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
                display: 'flex', mt: 2,
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
                />
            </Box>
            <Box sx={{
                width: '70rem', maxWidth: '90%',
            }}>
                <Typography noWrap component="div" sx={{
                    color: '#325343', mb: 1, textDecoration: 'underline',
                    fontWeight: 600, alignSelf: 'flex-start', cursor: 'pointer'
                }} onClick={handleGetRejectedLists} >
                    Rejected Connections
                </Typography>
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
export default ConnectionRequestsComponent