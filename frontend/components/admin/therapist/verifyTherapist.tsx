'use-client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTherapistsDetailsAction, adminStateType } from "@/store/admin/adminReducer";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { verifyTherapists } from "@/utilities/admin/therapists/verifyTherapist";
import { useRouter } from "next/navigation";
import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import Link from "next/link";

const verifyOptions = [
    'Granted',
    'Denied',
];

const AdminVerifyTherapists = () => {
    const dispatch = useDispatch();
    const therapists = useSelector((state: { admin: adminStateType }) => state.admin.therapists);
    const router = useRouter()
    const [search, setSearch] = useState<string>('');
    const [verifystatus, setVerifyStatus] = useState('')

    useEffect(() => {
        const adminData = localStorage.getItem("adminData");
        if (adminData) {
            dispatch(getTherapistsDetailsAction());
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
        { field: "slNo", headerName: "Sl.No", width: 60 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "email", headerName: "Email", width: 180 },
        { field: "role", headerName: "Role", width: 220 },
        { field: "verificationStatus", headerName: "Status", width: 100 },
        { field: "proof", headerName: "License", width: 100 },
        {
            field: "moreInfo",
            headerName: "More Info",
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <Link href={`/therapist/${params.row.id}`}
                >View
                </Link>
            ),
        },
        {
            field: "verify",
            headerName: "Verify",
            sortable: false,
            width: 160,
            renderCell: (params) => (
                <Box sx={{ m: 1, minWidth: 100, border: 'none', outline: 'none' }}>
                    <Select sx={{ outline: 'none', border: 'none' }}
                        value={verifystatus}
                        onChange={(e) => verifyTherapists(params.row.id, params.row.name, e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        disabled={params.row.isVerified}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {verifyOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Without label</FormHelperText>
                </Box>
            ),
        },
    ];

    const filteredTherapists = therapists.filter(therapist =>
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
        verificationStatus: therapist.verificationStatus,
        proof: therapist.license.licenseProof,
        moreInfo: 'view',
        isVerified: therapist.isVerified,
    }));
    console.log(therapists, 'therapist details')

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
export default AdminVerifyTherapists