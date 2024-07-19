'use-client'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridColDef } from '@mui/x-data-grid';
import { useRouter } from "next/navigation";
import Link from "next/link";
import TableComponent from "../../../common/tableComponent";
import { Box } from "@mui/system";
import { getClientsAllConnectionAction, clientMyActivityStateType } from "@/store/clients/clientMyActionReducer";

const AllActivityComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const allConnectionDetails = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.connectionDetails);

    useEffect(() => {
        dispatch(getClientsAllConnectionAction())
    }, [dispatch, router]);

    const columns: GridColDef[] = [
        { field: "no", headerName: "No", width: 20 },
        { field: "therapistName", headerName: "Therapist Name", width: 150 },
        { field: "reasonForCancelling", headerName: "Reason For Cancelling", width: 250 },
        {
            field: "details",
            headerName: "Details",
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <Link href={`/client/therapy/${params.row.therapistId}`} style={{ textDecoration: 'underline' }}
                >View
                </Link>
            ),
        },
    ];

    const rows = allConnectionDetails.map((connection, index) => ({
        id: connection._id,
        therapistName: connection.therapistId.name,
        therapistId: connection.therapistId._id,
        no: index + 1,
        reasonForCancelling: connection.reasonForDisconnection ? connection.reasonForDisconnection : 'Ongoing',
        details: 'view',
    }));

    const head = 'My Activity';
    const subHead = [
        { name: 'Ongoing', url: 'client/myActivity/ongoing', select: false },
        { name: 'All', url: 'client/myActivity/all', select: true },
    ]
    return (
        <Box sx={{
            backgroundColor: '#325343', pb: 8
        }}>
            <TableComponent rows={rows} columns={columns} head={head} subHead={subHead} role="" />
        </Box>
    );
}

export default AllActivityComponent;
