'use-client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTherapistsDetailsAction, adminStateType } from "@/store/admin/adminReducer";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import FormHelperText from '@mui/material/FormHelperText';
import { verifyTherapists } from "@/utilities/admin/therapists/verifyTherapist";
import { useRouter } from "next/navigation";
import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import Link from "next/link";
import TableComponent from "@/components/common/tableComponent";


const verifyOptions = [
    'Granted',
    'Denied',
];

const AdminVerifyTherapists = () => {
    const dispatch = useDispatch();
    const therapists = useSelector((state: { admin: adminStateType }) => state.admin.therapists);
    const router = useRouter()
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
    const columns: GridColDef[] = [
        { field: "slNo", headerName: "No", width: 10 },
        { field: "name", headerName: "Name", width: 120 },
        { field: "email", headerName: "Email", width: 150 },
        { field: "role", headerName: "Role", width: 210 },
        {
            field: "proof", headerName: "License", width: 90,
            renderCell: (params) => (
                <a href={params.row.proof} target="_blank" rel="noopener noreferrer">
                    <img src={params.row.proof} alt="license proof" width={30} height={30}
                        style={{ paddingTop: '0.8rem' }}
                    />
                </a>
            ),
        },
        {
            field: "moreInfo",
            headerName: "More Info",
            sortable: false,
            width: 90,
            renderCell: (params) => (
                <Link href={`/therapist/view/${params.row.id}`} style={{ textDecoration: 'underline' }}
                >View
                </Link>
            ),
        },
        { field: "verificationStatus", headerName: "Status", width: 90 },
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
                        onChange={(e) => verifyTherapists(params.row.id, params.row.name, e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        disabled={params.row.isVerified}
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
    const head = 'Verify Therapist';
    const subHead = [
        { name: 'All', url: 'admin/therapists/verify', select: true },
        { name: 'Rejected', url: 'admin/therapists/rejected', select: false }
    ]

    return (
        <Box sx={{
            ml: { xs: 'none', sm: '15rem' }, mt: { sm: 3 }
        }}>

            <TableComponent rows={rows} columns={columns} head={head} subHead={subHead} />
        </Box>
    );
}
export default AdminVerifyTherapists