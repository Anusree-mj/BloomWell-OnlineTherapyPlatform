'use-therapist'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTherapistsDetailsAction, adminStateType } from "@/store/admin/adminReducer";
import { GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { deleteTherapist, editTherapist } from "@/utilities/admin/therapists/manageTherapists";
import { useRouter } from "next/navigation";
import { Box, Button, } from "@mui/material";
import TableComponent from "@/components/common/tableComponent";

const AdminManageTherapists = () => {
    const dispatch = useDispatch();
    const therapists = useSelector((state: { admin: adminStateType }) => state.admin.therapists);
    const router = useRouter()

    useEffect(() => {
        const adminData = localStorage.getItem("adminData");
        if (adminData) {
            dispatch(getTherapistsDetailsAction());
        } else {
            router.push('/admin/login')
        }
    }, []);

    const handleDelete = (cliendId: string, therapistName: string) => {
        deleteTherapist(cliendId, therapistName);
    };
    const handleEdit = (cliendId: string, therapistName: string) => {
        editTherapist(cliendId, therapistName);
    };
    const columns: GridColDef[] = [
        { field: "slNo", headerName: "Sl.No", width: 70 },
        { field: "name", headerName: "Name", width: 140 },
        { field: "email", headerName: "Email", width: 140 },
        { field: "role", headerName: "Role", width: 210 },
        { field: "therapistStatus", headerName: "Status", width: 130 },
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            width: 90,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="success"
                    disabled={!params.row.isBlocked}
                    onClick={() => handleEdit(params.row.id, params.row.name)}
                >
                    <EditIcon />
                </Button>
            ),
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            width: 160,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    disabled={params.row.isBlocked}
                    onClick={() => handleDelete(params.row.id, params.row.name)}
                >
                    <PersonOffIcon />
                </Button>
            ),
        },
    ];
    const rows = therapists.map((therapist, index) => ({
        id: therapist._id,
        slNo: index + 1,
        name: therapist.name,
        email: therapist.email,
        role: therapist.role,
        therapistStatus: therapist.isBlocked ? 'Blocked' : 'Active',
        isBlocked: therapist.isBlocked,
    }));
    const head = 'Manage Therapist';
    return (
        <Box sx={{
            ml: { xs: 'none', sm: '15rem' }
        }}>
            <TableComponent rows={rows} columns={columns} head={head} subHead={[]} />
        </Box>
    );
}
export default AdminManageTherapists