import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button} from '@mui/material';

const cardItems = [
    { title: '3 Months', amount: '₹ 1,499', start: '#74b4ea', end: '#335471' },
    { title: '6 Months', amount: '₹ 2,999', start: '#df6d6d', end: '#9d1414' },
    { title: '1 year', amount: '₹ 5,999', start: '#eab062', end: '#6a4006' }
];

const PaymentComponent = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#F7FCC2',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '85vh',
                paddingBottom: '2rem'
            }}
        >
            <Box
                sx={{
                    width: '80rem',
                    backgroundColor: 'white',
                    mt: 6,
                    pt: 4, pb: 7,
                    maxWidth: '90%',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '0.6rem',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '2rem',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}
            >
                <Box sx={{
                    width: '69rem',
                    maxWidth: '80%'
                }}>

                    <Typography
                        sx={{
                            width: '50rem',
                            maxWidth: '90%',
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: '#325343'
                        }}>
                        Choose your plan
                    </Typography>
                    <Typography
                        sx={{
                            width: '50rem',
                            maxWidth: '90%',
                            fontSize: '1rem',
                            mt: 1,
                            fontWeight: 600,
                            color: '#325343'
                        }}
                    >
                        Enjoy 24/7 messaging and weekly live sessions with our professional therapists.
                        Subscribe now to ensure you receive the highest quality care anytime you need it.
                    </Typography>
                </Box>
                {cardItems.map((item) => (
                    <Card
                        key={item.title}
                        sx={{
                            width: '20rem',
                            maxWidth: '80%',
                            backgroundColor: 'white',
                            border: `2px solid transparent`,
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            position: 'relative',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderColor: item.end,
                                '& .waves': {
                                    inset: '-40% -20% 0 -40%',
                                    transition: 'all 0.5s ease'
                                },
                            }
                        }}
                    >
                        <Box
                            sx={{
                                background: `linear-gradient(to right, ${item.start}, ${item.end})`,
                                padding: '2rem',
                                textAlign: 'center',
                                color: '#FFFFFF',
                            }}
                        >
                            <Typography variant="h4">
                                {item.amount}<span style={{ fontSize: '1rem', fontWeight: 'lighter' }}>/mo</span>
                            </Typography>
                            <Typography variant="h6">{item.title}</Typography>
                        </Box>
                        <CardContent sx={{ padding: '2rem' }}>
                            <ul style={{ listStyleType: 'none', padding: 0, color: '#A3A3A3', textAlign: 'center' }}>
                                <li>Weekly live sessions</li>
                                <li>24/7 chat support</li>
                            </ul>
                            <Button
                                variant="outlined"
                                sx={{
                                    width: '100%',
                                    mt: 2,
                                    borderRadius: '0.7rem',
                                    border: `1px solid ${item.end}`,
                                    color: '#325343',
                                    '&:hover': {
                                        border: `1px solid ${item.end}`,
                                        backgroundColor: item.start,
                                        color: '#325343'
                                    }
                                }}
                            >
                                Subscribe
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    width: '100%',
                                    mt: 2,
                                    borderRadius: '0.7rem',
                                    backgroundColor: item.end,
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#49873D',
                                        color: 'white'
                                    }
                                }}
                            >
                                Apply for financial aid
                            </Button>
                        </CardContent>
                        <Box
                            className="waves"
                            sx={{
                                position: 'absolute',
                                inset: '-35% 0 0 0',
                                color: '#1d1f20',
                                transition: 'all 0.5s ease',
                                overflow: 'hidden',
                                zIndex: -10,
                                '& svg': {
                                    transition: 'all 0.3s ease'
                                }
                            }}
                        >
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default PaymentComponent