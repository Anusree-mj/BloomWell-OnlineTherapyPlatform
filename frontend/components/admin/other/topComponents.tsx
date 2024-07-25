import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Rating, CardActions } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { getTopTherapistsAction, adminActivitiesStateType } from '@/store/admin/adminActivityReducer';

const TopTherapistsComponents = () => {
    const dispatch = useDispatch();
    const topTherapists = useSelector((state: { adminActivities: adminActivitiesStateType }) => state.adminActivities.topTherapists || []);

    useEffect(() => {
        dispatch(getTopTherapistsAction())
    }, [])

    return (
        <Box
            sx={{
                display: 'flex', alignItems: { md: 'flex-start', xs: 'center' }, justifyContent: { md: 'flex-start', xs: 'center' },
                flexDirection: 'column', maxWidth: '90%',ml:3
            }}>
            <Typography sx={{
                color: '#325343', mt: 1, ml: 2,
                fontWeight: 600, alignSelf: 'flex-start'
            }}>
                BloomWell Top 3 Therapists
            </Typography>
            <Box sx={{
                display: 'flex', flexWrap: 'wrap', gap: 5,
                alignItems: 'center', justifyContent: 'center' 
            }}>
                {topTherapists.map((item, index) => (
                    <Card key={index} sx={{
                        mt: 2,
                        display: 'flex',
                        flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
                        borderRadius: '1rem', width: '9rem', maxWidth: '90%'
                    }}>
                        <CardActionArea>
                            <CardContent sx={{
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <CardMedia
                                    component="img"
                                    image={item.therapistImage}
                                    alt="therapist profile"
                                />
                                <Typography
                                    sx={{
                                        color: '#325343',
                                        fontSize: '1rem', fontWeight: 600, mt: 1
                                    }}>
                                    {item.therapistName}
                                </Typography>
                                {/* <Typography
                                sx={{
                                    mt: '0.2rem',
                                    color: '#325343',
                                    fontSize: '0.9rem', fontWeight: 200,
                                }}>
                                {item.role}
                            </Typography> */}
                                <Rating name="read-only" value={item.averageRating} readOnly />
                                <Link href={`/therapist/view/${item.therapistId}`} style={{
                                    textDecoration: 'underline', fontSize: '0.8rem'
                                }}
                                >View
                                </Link>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                ))}
            </Box>
        </Box>
    )
}

export default TopTherapistsComponents