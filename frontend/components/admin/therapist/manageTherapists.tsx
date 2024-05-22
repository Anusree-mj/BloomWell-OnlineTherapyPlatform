'use-therapist'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTherapistsDetailsAction, adminStateType } from "@/store/admin/adminReducer";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { deleteTherapist, editTherapist } from "@/utilities/admin/therapists/manageTherapists";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography } from "@mui/material";

const AdminManageTherapists = () => {
    const dispatch = useDispatch();
    const therapists = useSelector((state: { admin: adminStateType }) => state.admin.therapists);
    const router = useRouter()
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        const adminData = localStorage.getItem("adminData");
        if (adminData) {
            dispatch(getTherapistsDetailsAction());
        } else {
            router.push('/admin/login')
        }
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
    };

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

    const filteredtherapists = therapists.filter(therapist =>
        therapist.name.toLowerCase().includes(search) ||
        therapist.email.toLowerCase().includes(search) ||
        therapist.role?.toLowerCase().includes(search) ||
        (therapist.isBlocked ? 'Blocked' : 'Active').toLowerCase().includes(search)
    );

    const rows = therapists.map((therapist, index) => ({
        id: therapist._id,
        slNo: index + 1,
        name: therapist.name,
        email: therapist.email,
        role: therapist.role,
        therapistStatus: therapist.isBlocked ? 'Blocked' : 'Active',
        isBlocked: therapist.isBlocked,
    }));

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
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '63rem', maxWidth: '90%',
            }}>
                <Typography variant="h6" noWrap component="div" sx={{
                    color: '#325343',
                    fontWeight: 800
                }}>
                    Manage Therapist
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
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </Box>


        </Box>
    );
}
export default AdminManageTherapists