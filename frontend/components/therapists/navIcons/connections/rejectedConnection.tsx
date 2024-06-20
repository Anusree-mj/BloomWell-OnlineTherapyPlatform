'use-client'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GridColDef } from '@mui/x-data-grid';
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { getTherapistsRejectedConnectionsAction, ActivitiesStateType } from "@/store/therapists/therapistActvitiesHandlerReducers";
import TableComponent from "@/components/common/tableComponent";


const RejectedConnectionsComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const connections = useSelector((state: {
        therapistActivities: ActivitiesStateType
    }) => state.therapistActivities.connections);

    useEffect(() => {
        const therapistData = localStorage.getItem("therapistData");
        if (therapistData) {
            dispatch(getTherapistsRejectedConnectionsAction());
        } else {
            router.push('/login')
        }
    }, []);

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
                    <Link href={`/therapist/connections/rejected/addReason/${params.row.id}`} style={{ textDecoration: 'underline' }}>
                        ADD
                    </Link>
                )
            ),
        },

    ];

    const rows = connections.map((connection, index) => ({
        id: connection._id,
        no: index + 1,
        name: connection.clientId.name,
        email: connection.clientId.email,
        reason: connection.reasonForRejection,
        addReason: 'ADD',
    }));

    const head = 'Connection Requests';
    const subHead = [
        { name: 'All', url: 'therapist/connections', select: false },
        { name: 'Rejected', url: 'therapist/connections/rejected', select: true }
    ]

    return (
        <Box sx={{
            backgroundColor: '#F7FCC2',
        }}>
            <TableComponent rows={rows} columns={columns} head={head} subHead={subHead} />
        </Box>
    );
}
export default RejectedConnectionsComponent