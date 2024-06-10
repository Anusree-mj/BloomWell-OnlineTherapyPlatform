'use-client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from "next/navigation";
import { Box, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { getRejectedTherapistsDetailsAction, adminStateType } from "@/store/admin/adminReducer";


const RejectedTherapistsComponent = () => {
    const dispatch = useDispatch();
    const therapists = useSelector((state: { admin: adminStateType }) => state.admin.therapists);
    const router = useRouter()
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        const adminData = localStorage.getItem("adminData");
        if (adminData) {
            dispatch(getRejectedTherapistsDetailsAction());
            console.log(therapists, 'therapist details')
        } else {
            router.push('/admin/login')
        }
    }, []);


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
    };


    const columns: GridColDef[] = [
        { field: "slNo", headerName: "No", width: 10 },
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
                    <Link href={`/admin/therapists/rejected/addReason/${params.row.id}`} style={{ textDecoration: 'underline' }}>
                        ADD
                    </Link>
                )
            ),
        },
    ];

    const filteredTherapists = therapists.filter(therapist =>
        therapist.name.toLowerCase().includes(search) ||
        therapist.email.toLowerCase().includes(search) ||
        therapist.role?.toLowerCase().includes(search) ||
        (therapist.isBlocked ? 'Blocked' : 'Active').toLowerCase().includes(search)
    );

    const rows = filteredTherapists.map((therapist, index) => ({
        id: therapist._id,
        slNo: index + 1,
        name: therapist.name,
        email: therapist.email,
        reason: therapist.reasonForRejection,
        addReason: 'ADD',
    }));

    const handleGetAll = () => {
        router.push('/admin/therapists/verify')
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
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '63rem', maxWidth: '90%',
            }}>
                <Typography variant="h6" noWrap component="div" sx={{
                    color: '#325343',
                    fontWeight: 800
                }}>
                    Verify Therapist
                </Typography>
                <TextField
                    label="Search..."
                    variant="outlined"
                    value={search}
                    onChange={handleSearch}
                    sx={{ marginBottom: 2, }}
                />
            </Box>
            <Box sx={{
                width: '70rem', maxWidth: '90%',
            }}>
                <Typography noWrap component="div" sx={{
                    color: '#325343', mb: 1, textDecoration: 'underline',
                    fontWeight: 600, alignSelf: 'flex-start', cursor: 'pointer'
                }} onClick={handleGetAll} >
                    All Therapists
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
export default RejectedTherapistsComponent