'use-client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridColDef } from '@mui/x-data-grid';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getTherapistsActiveConnectionsAction, connectionStateType } from "@/store/therapists/therapistConnectionHandlerReducers";
import TableComponent from "../../../common/tableComponent";
import { therapistStateType } from "@/store/therapists/therapistReducers";
import DoSomethingComponent from "@/components/common/doSomethingComponent";
import { Box } from "@mui/system";

const ActiveConnectionComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const therapist = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);
    const [isQuit, setIsquit] = useState(false)

    const connections = useSelector((state: {
        therapistConnectionRequests: connectionStateType
    }) => state.therapistConnectionRequests.connections);

    useEffect(() => {
        const therapistData = localStorage.getItem("therapistData");
        if (therapistData) {
            const parsedData = JSON.parse(therapistData);
            if (parsedData.verificationStatus === 'Granted' && !parsedData.isActive) {
                setIsquit(true)
            } else {
                dispatch(getTherapistsActiveConnectionsAction());
            }
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
        details: 'view profile',
        medicalInfo: 'view',
    }));

    const head = 'Active Connections';
    const subHead = [
        { name: 'Active', url: 'therapist/activities/active', select: true },
        { name: 'Inactive', url: 'therapist/activities/inActive', select: false }
    ]
    return (
        <Box sx={{
            backgroundColor: '#F7FCC2', pb: 8
        }}>
            {!isQuit ?
                <TableComponent rows={rows} columns={columns} head={head} subHead={subHead} />
                : <DoSomethingComponent
                    content="Since you left BlloomWell all your connections have been disconnected. If you'd like to rejoin, we'd love to welcome you back!"
                    buttonTitle="Let's Rejoin" url="#"
                />
            }
        </Box>
    );
}

export default ActiveConnectionComponent;
