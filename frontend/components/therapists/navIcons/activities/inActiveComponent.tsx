'use-client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridColDef } from '@mui/x-data-grid';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getTherapistsInActiveConnectionsAction, ActivitiesStateType } from "@/store/therapists/therapistActvitiesHandlerReducers";
import TableComponent from "../../../common/tableComponent";
import { Box } from "@mui/system";

const InActiveConnectionComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const connections = useSelector((state: {
        therapistActivities: ActivitiesStateType
    }) => state.therapistActivities.connections);

    useEffect(() => {
        const therapistData = localStorage.getItem("therapistData");
        if (therapistData) {
            dispatch(getTherapistsInActiveConnectionsAction());
        } else {
            router.push('/login');
        }
    }, [dispatch, router]);

    const columns: GridColDef[] = [
        { field: "no", headerName: "No", width: 20 },
        { field: "clientName", headerName: "Name", width: 150 },
        { field: "description", headerName: "Description", width: 250 },
        {
            field: "medicalInfo",
            headerName: "Medical Info",
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <Link href={`/client/medicalInfo/${params.row.clientId}`} style={{ textDecoration: 'underline' }}
                >View
                </Link>
            ),
        },
        { field: "reason", headerName: "Reason For Disconnection", width: 250 },
        {
            field: "details",
            headerName: "Details",
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <Link href={`/client/medicalInfo/${params.row.clientId}`} style={{ textDecoration: 'underline' }}
                >View Profile
                </Link>
            ),
        },
    ];

    const rows = connections.map((connection, index) => ({
        id: connection._id,
        clientName: connection.clientId.name,
        clientId: connection.clientId._id,
        no: index + 1,
        description: connection.description,
        reason: connection.reasonForDisconnection,
        details: 'view profile',
        medicalInfo: 'view',
    }));

    const head = 'InActive Connections';
    const subHead = [
        { name: 'Ongoing', url: 'client/myActivity/ongoing', select: false },
        { name: 'All', url: 'client/myActivity/inActive', select: true },
        { name: 'Goals', url: 'client/myActivity/reviews', select: false },
        { name: 'Worksheets', url: 'client/myActivity/reviews', select: false },
        { name: 'BookSlot', url: 'client/myActivity/reviews', select: false }

    ]
    return (
        <Box sx={{
            backgroundColor: '#F7FCC2', pb: 8
        }}>
            <TableComponent rows={rows} columns={columns} head={head} subHead={subHead} />
        </Box>
    );
}

export default InActiveConnectionComponent;
