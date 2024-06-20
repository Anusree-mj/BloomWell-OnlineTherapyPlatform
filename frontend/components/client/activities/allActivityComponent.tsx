'use-client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getClientOngoingActivityAction, clientMyActivityStateType } from "@/store/clients/clientMyActionReducer";
import { io } from 'socket.io-client'
import { useRouter } from "next/navigation";
import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DoSomethingComponent from "./doSomethingComponent";

const columnItems = [
    { field: 'no', header: 'No', width: 10 },
    { field: 'date', header: 'Date', width: 120 },
    { field: 'time', header: 'Time', width: 100 },
    { field: 'duration', header: 'Duration', width: 100 },
    { field: 'goals', header: 'Goals', width: 100, link: '#' },
    { field: 'worksheets', header: 'Worksheets', width: 100, link: '#' },
    { field: 'remarks', header: 'Remarks', width: 150 },
]

const AllActivityComponent = () => {
    const socket = io(`${process.env.NEXT_PUBLIC_SERVER_API_URL}`);
    const dispatch = useDispatch();
    const connectionDetails = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.connectionDetails);
    const ongoingActivity = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.ongoingActivity);
    const router = useRouter()
    const [search, setSearch] = useState<string>('');


    useEffect(() => {
        const clientData = localStorage.getItem("clientData");
        if (clientData) {
            dispatch(getClientOngoingActivityAction());
        } else {
            router.push('/login');
        }
    }, [dispatch, router]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
    };


    const columns: GridColDef[] = columnItems.map(item => {
        const column: GridColDef = {
            field: item.field,
            headerName: item.header,
            width: item.width,
        };

        if (item.link) {
            column.renderCell = (params) => (
                <Link href={item.link} style={{ textDecoration: 'underline' }}>
                    View
                </Link>
            );
        }

        return column;
    });

    // const filteredConnections = connections.filter(connection =>
    //     connection.clientId.name.toLowerCase().includes(search) ||
    //     connection.clientId.email.toLowerCase().includes(search) ||
    //     connection.status.toLowerCase().includes(search)
    // );

    // const rows = ongoingActivity.map((activity, index) => ({
    //     id: activity._id,
    //     no: index + 1,
    //     date: activity.date,
    //     time: activity.time,
    //     duration: activity.duration,
    //     goals: 'view',
    //     worksheets: 'view',
    //     remarks: activity.remarks
    // }));

    return (
        <Box sx={{
            display: 'flex', backgroundColor: '#F7FCC2',
            flexDirection: 'column', minHeight: '80vh',
            alignItems: 'center', justifyContent: 'center',
        }}>
            {connectionDetails.therapistName !== '' ? (
                <>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '63rem', maxWidth: '90%',
                    }}>
                        <Typography sx={{
                            color: '#325343', fontSize: '1.2rem',
                            fontWeight: 800
                        }}>
                            Therapist:{` ${connectionDetails.therapistName}`}{connectionDetails.isActive ? '' : ' (Pending verification)'}
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
                            // rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </Box>
                </>

            ) : (
                <DoSomethingComponent />
            )}
        </Box>
    )
}
export default AllActivityComponent