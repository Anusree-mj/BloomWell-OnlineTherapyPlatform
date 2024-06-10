'use-client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from "next/navigation";
import { Box, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { getTherapistsRejectedConnectionsAction, connectionStateType } from "@/store/therapists/therapistConnectionHandlerReducers";


const RejectedConnectionsComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const [search, setSearch] = useState<string>('');
    const connections = useSelector((state: {
        therapistConnectionRequests: connectionStateType
    }) => state.therapistConnectionRequests.connections);

    useEffect(() => {
        const therapistData = localStorage.getItem("therapistData");
        if (therapistData) {
            dispatch(getTherapistsRejectedConnectionsAction());
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
                    <Link href={`/therapist/dashboard/connections/rejected/addReason/${params.row.id}`} style={{ textDecoration: 'underline' }}>
                        ADD
                    </Link>
                )
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
        reason: connection.reasonForRejection,
        addReason: 'ADD',
    }));

    const handleGetAll = () => {
        router.push('/therapist/dashboard/connections')
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
                }} onClick={handleGetAll} >
                    All Connections
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
export default RejectedConnectionsComponent