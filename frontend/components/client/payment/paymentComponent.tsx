import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea } from '@mui/material';

const textItems = [
    'Cost: <strong>₹1500</strong> per <strong>3 months</strong> (cancel anytime)',
    'Includes:', '* Weekly live session', '*24/7 chat support',
    '<strong><u>Financial Aid Available</u></strong>',
    `If cost is a barrier, you may apply for financial aid. 
    Eligible applicants can receive 25% to 50% off their subscription fees.`,
    'Payment method we support:  '
];

const PaymentComponent = () => {
    return (
        <Box sx={{
            backgroundColor: '#F7FCC2', display: 'flex',
            justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
            height: '85vh', paddingBottom: '2rem'
        }}>
            <Typography
                sx={{
                    width: '50rem', maxWidth: '90%',
                    fontSize: '1.1rem', mt: 1, fontWeight: 600,
                    textAlign: 'center', color: '#325343',
                }}>Enjoy 24/7 messaging and weekly live sessions with our professional therapists.
                Subscribe now to ensure you receive the highest quality care anytime you need it.
            </Typography>
            <Box sx={{
                width: '80rem', backgroundColor: 'white', mt: 6,
                padding: 4, maxWidth: '90%', minHeight: '50vh',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '0.6rem',
                display: 'flex', flexDirection: 'column',
                alignItems: 'flex-start', justifyContent: 'flex-start'
            }}>
                {textItems.map((item, index) => (
                    <Typography
                        key={index}
                        sx={{
                            fontSize: '0.9rem', fontWeight: 600, color: '#325343',
                            width: '50rem', maxWidth: '80%', mb: 1
                        }}
                        dangerouslySetInnerHTML={{ __html: item }}
                    />
                ))}
                <Card sx={{ maxWidth: '30%', width: '5rem' }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/page/payment.png"
                            alt="green iguana"
                        />
                    </CardActionArea>
                </Card>
                <Box sx={{
                    display: 'flex'
                }}>
                    <Button variant="contained"
                        sx={{
                            color: '#325343', mt: 2, borderRadius: '0.7rem',
                            backgroundColor: '#a6de9b', mb: 3,
                            '&:hover': {
                                backgroundColor: '#49873D',
                                color: 'white',
                                '& .MuiTypography-root': {
                                    color: 'white',
                                }
                            }
                        }}>
                        Subscribe</Button>
                    <Button
                        variant="contained"
                        sx={{
                            color: 'white', mt: 2, borderRadius: '0.7rem',
                            backgroundColor: '#325343', mb: 3, ml: 2,
                            '&:hover': {
                                backgroundColor: '#49873D',
                                color: 'white',
                                '& .MuiTypography-root': {
                                    color: 'white',
                                }
                            }
                        }}
                    >
                        Apply for financial aid
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}


export default PaymentComponent