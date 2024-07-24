'use-client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GridColDef } from '@mui/x-data-grid';
import FormHelperText from '@mui/material/FormHelperText';
import { useRouter } from "next/navigation";
import { Box, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import { getTherapistsConnectionRequestAction, ActivitiesStateType } from "@/store/therapists/therapistActvitiesHandlerReducers";
import { manageConnectionRequest } from "@/utilities/therapists/manageConnectionRequest";
import TableComponent from "@/components/common/tableComponent";

const verifyOptions = [
    'Accept',
    'Reject',
];

const ConnectionRequestsComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const [verifystatus, setVerifyStatus] = useState('')
    const connections = useSelector((state: {
        therapistActivities: ActivitiesStateType
    }) => state.therapistActivities.connections);

    useEffect(() => {
        dispatch(getTherapistsConnectionRequestAction());
    }, []);

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
                <Link href={`/client/medicalInfo/${params.row.clientId}`} style={{ textDecoration: 'underline' }}
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
                        disabled={params.row.verificationStatus !== 'pending' || params.row.verificationStatus === 'Rejected by admin'}
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
        id: connection._id|| 'no-id',
        clientId: connection.clientId._id|| 'Unknown',
        no: index + 1,
        name: connection.clientId.name|| 'Unknown',
        email: connection.clientId.email|| 'Unknown',
        verificationStatus: connection.adminVerify === 'Reject' ? 'Rejected by admin' : connection.status,
        medicalInfo: 'view',
    }));
    const head = 'Manage Connections';
    const subHead = [
        { name: 'All', url: 'therapist/connections', select: true },
        { name: 'Rejected', url: 'therapist/connections/rejected', select: false }
    ]

    return (
        <Box sx={{
            backgroundColor: '#325343', pb: 8
        }}>
            <TableComponent rows={rows} columns={columns} head={head} subHead={subHead} role="" />
        </Box>
    );
}
export default ConnectionRequestsComponent