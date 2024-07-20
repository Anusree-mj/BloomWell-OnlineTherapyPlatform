'use-therapist'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GridColDef } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from "next/navigation";
import { Box, Button, } from "@mui/material";
import TableComponent from "@/components/common/tableComponent";
import { getTherapistsSchedulesAction, ActivitiesStateType } from "@/store/therapists/therapistActvitiesHandlerReducers";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import { format } from 'date-fns';
import { apiCall } from "@/services/api";

const TherapistsScheulesComponent = () => {
    const dispatch = useDispatch();
    const scheduleDetails = useSelector((state: { therapistActivities: ActivitiesStateType }) => state.therapistActivities.schedules);
    const router = useRouter()

    useEffect(() => {
        dispatch(getTherapistsSchedulesAction());
    }, []);

    const handleVerify = async (scheduleId: string, action: string, clientId: string,
        date: string, time: string
    ) => {
        const result = await Swal.fire({
            title: `Are you sure you want to ${action === 'Accepted' ? 'confirm' : 'reject'} this schedule?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${action === 'Accepted' ? 'confirm' : 'reject'} ! `
        });
        if (result.isConfirmed) {
            try {

                const response = await apiCall({
                    method: 'PUT',
                    endpoint: `therapist/schedules`,
                    body: { scheduleId, action, clientId, date, time }
                });
                if (response.status === 'ok') {
                    dispatch(getTherapistsSchedulesAction());
                }
            } catch (err) {
                console.error(err);
            }
        }
    };
    const formatDate = (dateString: string): string => {
        const [day, month, year] = dateString.split('-').map(Number);
        const date = new Date(2000 + year, month - 1, day);
        return format(date, "do MMM");
    };

    const columns: GridColDef[] = [
        { field: "slNo", headerName: "Sl.No", width: 50 },
        {
            field: "client",
            headerName: "Client",
            sortable: true,
            width: 150,
            renderCell: (params) => (
                <Link href={`/therapist/therapy/${params.row.clientId}`} style={{ textDecoration: 'underline' }}
                >{params.row.client}
                </Link>
            ),
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 120,
            renderCell: (params) => (
                <div>{params.value ? formatDate(params.value as string) : ''}</div>
            ),
        }, { field: "time", headerName: "Time", width: 150 },
        { field: "verificationStatus", headerName: "Verification Status", width: 180 },
        { field: "status", headerName: "Status", width: 150 },
        {
            field: "verify",
            headerName: "Verify",
            sortable: false,
            width: 180,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        color="success"
                        disabled={params.row.verificationStatus !== 'Pending' || params.row.status !== 'Pending'}
                        onClick={() => handleVerify(params.row.id, 'Accepted', params.row.clientId,
                            params.row.date, params.row.time
                        )}
                    >
                        <CheckIcon />
                    </Button>
                    <Button sx={{ ml: 2 }}
                        variant="contained"
                        color="error"
                        disabled={params.row.verificationStatus !== 'Pending' || params.row.status !== 'Pending'}
                        onClick={() => handleVerify(params.row.id, 'Rejected', params.row.clientId,
                            params.row.date, params.row.time
                        )}
                    >
                        <ClearIcon />
                    </Button>
                </>
            ),
        },
    ];
    const rows = scheduleDetails.map((schedule, index) => ({
        id: schedule._id,
        slNo: index + 1,
        client: schedule.clientId.name,
        clientId: schedule.clientId._id,
        date: schedule.date,
        time: schedule.time,
        verificationStatus: schedule.verificationStatus === 'pending' ? 'Pending' : schedule.verificationStatus,
        status: schedule.status === 'pending' ? 'Pending' : schedule.status,
    }));
    const head = 'My Activity';
    const subHead = [
        { name: 'Active', url: 'therapist/activities/active', select: false },
        { name: 'Inactive', url: 'therapist/activities/inActive', select: false },
        { name: 'Schedules', url: 'therapist/activities/schedules', select: true },
        { name: 'Reviews', url: 'therapist/activities/reviews', select: false }
    ]
    return (
        <Box sx={{
            backgroundColor: '#325343', pb: 8
        }}>
            <TableComponent rows={rows} columns={columns} head={head} subHead={subHead} role="" />
        </Box>
    );
}
export default TherapistsScheulesComponent