import React, { useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Rating } from '@mui/material';
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation";
import { getConnectionsAction, clientConnectionStateType } from '@/store/clients/clientConnectionReducer';
import Link from "next/link";


const ConnectionComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const therapists = useSelector((state: { clientConnection: clientConnectionStateType }) => state.clientConnection.therapist);


    useEffect(() => {
        const clientData = localStorage.getItem("clientData");
        if (clientData) {
            const parsedData = JSON.parse(clientData);
            const clientId = parsedData._id;
            dispatch(getConnectionsAction(clientId));
        } else {
            router.push('/login')
        }
    }, []);

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
                    mt: '1rem',
                    color: '#325343',
                    fontSize: '1.2rem', fontWeight: 600,
                }}>
                These are our top therapists,selected just for you.
                Feel free to pick one and connect with them.
            </Typography>
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
                            <Link href={`/therapist/${item._id}`} style={{
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
                        }}>
                            Connect
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
};

export default ConnectionComponent