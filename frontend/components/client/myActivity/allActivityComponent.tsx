'use-client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getClientDetailsAction, clientStateType } from "@/store/clients/clientReducer";
import { toast } from 'react-toastify';
import FormHelperText from '@mui/material/FormHelperText';
import { useRouter } from "next/navigation";
import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import Link from "next/link";


const AllActivityComponent = () => {
    const client = useSelector((state: { client: clientStateType }) => state.client.client);
    const dispatch = useDispatch();
    const router = useRouter()
    const [connectionField, setConnectionField] = useState(false);


    useEffect(() => {
        const clientData = localStorage.getItem("clientData");
        if (clientData) {
            const parsedData = JSON.parse(clientData);
            const clientId = parsedData._id;
            dispatch(getClientDetailsAction(clientId));
        } else {
            router.push('/login');
        }
    }, [dispatch, router]);

    useEffect(() => {
        if (client && client._id) {
            if (client.isBlocked) {
                toast.error('User is blocked');
                router.push('/login');
            } else {
                setConnectionField(!client.isConnected);
            }
        }
    }, [client, router]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh', mt: 2,
            ml: { sm: '15rem' }
        }}>
            {connectionField === true ? (
                <Box sx={{
                    display: 'flex', flexDirection: 'column', maxWidth: '90%',
                    width: '30rem', pt: 6, pb: 6, borderRadius: '1rem',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'
                }}>
                    <Typography>
                        You haven't connected to any therapist yet!
                    </Typography>
                    <Link href="/client/connection" passHref>
                        <Button component="a" sx={{
                            my: 2, mx: 2, color: 'white', backgroundColor: '#325343',
                            display: 'block', fontWeight: 600,
                        }} variant="contained">
                            Let's Connect
                        </Button>
                    </Link>
                </Box>
            ) : (
                <>My Activity</>
            )}
        </Box>
    )
}
export default AllActivityComponent