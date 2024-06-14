import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Rating } from '@mui/material';
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation";
import {
    getConnectionsAction,
    postConnectionAction,
    clientConnectionStateType
} from '@/store/clients/clientConnectionReducer';
import Link from "next/link";
import Swal from 'sweetalert2';
import { getClientDetailsAction } from "@/store/clients/clientReducer";


const ConnectionComponent = () => {
    const socket = io(`${process.env.NEXT_PUBLIC_SERVER_API_URL}`);
    const dispatch = useDispatch();
    const router = useRouter()
    const therapists = useSelector((state: { clientConnection: clientConnectionStateType }) => state.clientConnection.therapist);
    const [clientId, setClientId] = useState('');
    const [clientName, setClientName] = useState('')
    useEffect(() => {
        const clientData = localStorage.getItem("clientData");
        if (clientData) {
            const parsedData = JSON.parse(clientData);
            if (parsedData.isConnected) {
                router.push('/client/myActivity')
            } else {
                setClientId(parsedData._id);
                setClientName(parsedData.name)
                dispatch(getConnectionsAction(parsedData._id));
            }
        } else {
            router.push('/login')
        }
    }, []);

    const handleConnection = (therapistId: string) => {
        socket.emit('send_message', { clientName })
        dispatch(postConnectionAction({ therapistId, handleConnectionSuccess }))
    }
    const handleConnectionSuccess = (therapistName: string) => {
        Swal.fire({
            title: 'Connection Sent!',
            text: `Your connection request to ${therapistName} was sent successfully. Please wait for their response. Stay healthy!`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(getClientDetailsAction(clientId));
                router.push('/client/myActivity');
            }
        })
    }

    return (
        <Box
            sx={{
                backgroundColor: '#F7FCC2',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '90vh',
                paddingBottom: '2rem'
            }}
        >
            <Typography
                sx={{
                    mt: 1,
                    color: '#325343',
                    fontSize: '1.2rem', fontWeight: 600,
                }}>
                These are our top therapists,selected just for you.
                Feel free to pick one and connect with them.
            </Typography>
            <Box sx={{
                display: 'flex', flexWrap: 'wrap', gap: 5,
                justifyContent: 'center', alignItems: 'center', mt: 2
            }}>
                {therapists.map((item, index) => (
                    <Card key={index} sx={{
                        mt: 2,
                        display: 'flex',
                        flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
                        borderRadius: '1rem', width: '15rem', maxWidth: '80%'
                    }}>
                        <CardActionArea>
                            <CardContent sx={{
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <CardMedia
                                    component="img"
                                    height="50"
                                    image={item.image}
                                    alt="green iguana"
                                />
                                <Typography
                                    sx={{
                                        color: '#325343',
                                        fontSize: '1.2rem', fontWeight: 600, mt: 1
                                    }}>
                                    {item.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        mt: '0.2rem',
                                        color: '#325343',
                                        fontSize: '0.9rem', fontWeight: 200,
                                    }}>
                                    {item.role}
                                </Typography>
                                <Rating name="read-only" value={item.averageRating} readOnly />
                                <Link href={`/therapist/view/${item._id}`} style={{
                                    marginTop: '0.4rem',
                                    textDecoration: 'underline'
                                }}
                                >View
                                </Link>
                            </CardContent>
                        </CardActionArea>
                        <CardActions sx={{
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Button sx={{
                                width: '15rem', maxWidth: '80%',
                                color: '#325343', borderRadius: '0.7rem',
                                backgroundColor: '#a6de9b',
                                '&:hover': {
                                    backgroundColor: '#325343',
                                    color: 'white'
                                }
                            }} onClick={(e) => { handleConnection(item._id) }}
                            >
                                Connect
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ConnectionComponent