import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import { useRouter } from 'next/navigation';

interface Product {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    custom_unit_amount: number | null;
    livemode: boolean;
    lookup_key: string | null;
    metadata: Record<string, any>;
    nickname: string | null;
    product: string;
    recurring: {
        aggregate_usage: string | null;
        interval: string;
        interval_count: number;
        trial_period_days: number | null;
    };
    tax_behavior: string;
    tiers_mode: string | null;
    transform_quantity: string | null;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
}

const cardItems = [
    { title: 'Basic', span: '/3mo', list: 'For 3months', start: '#74b4ea', end: '#335471' },
    { title: 'Standard', span: '/6mo', list: 'For 6months', start: '#df6d6d', end: '#9d1414' },
    { title: 'Premium', span: '/1year', list: 'For 1year', start: '#eab062', end: '#6a4006' }
];

const PaymentComponent = () => {
    const router = useRouter()
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const clientData = localStorage.getItem("clientData");
        if (!clientData) {
            router.push('/login')
        } else {
            const parsedData = JSON.parse(clientData);
            if (parsedData.isSubscribed) {
                router.push('/client/myActivity')
            } else {
                console.log('reached in fetch else')

                const fetchProducts = async () => {
                    try {
                        console.log('reached in fetch')
                        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/client/payment`,
                            { withCredentials: true, }
                        );
                        console.log(response.data, 'data got');
                        setProducts(response.data.products);
                    } catch (error) {
                        console.error('Error fetching products:', error);
                    }
                };
                fetchProducts();
            }
        }
    }, []);

    const handleSubscription = async (e: { preventDefault: () => void; }, productId: string) => {
        try {
            e.preventDefault();
            console.log('entered in handle subscription')
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/client/payment`,
                { productId: productId },
                { withCredentials: true, }
            );
            router.push(data.url)
        } catch (error) {
            console.error('Error :', error);
        }
    }

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
                            fontWeight: 600,
                            color: '#325343'
                        }}>
                        Enjoy 24/7 messaging and weekly live sessions with our professional therapists.
                        Subscribe now to ensure you receive the highest quality care anytime you need it.
                    </Typography>
                </Box>

                {products && products.map((product, index) => {
                    const item = cardItems[index];
                    return (
                        <Card
                            key={product.id}
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
                            }}>
                            <Box
                                sx={{
                                    background: `linear-gradient(to right, ${item.start}, ${item.end})`,
                                    padding: '2rem',
                                    textAlign: 'center',
                                    color: '#FFFFFF',
                                }}
                            >
                                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                    {item.title}<span style={{ fontSize: '1rem', fontWeight: 'lighter' }}>{item.span}</span>
                                </Typography>
                                <Typography variant="h4">₹ {product.unit_amount / 100}</Typography>
                            </Box>
                            <CardContent sx={{ padding: '2rem' }}>
                                <ul style={{
                                    listStyleType: 'none', padding: 0, color: '#325343',
                                    fontSize: '0.9rem', textAlign: 'start'
                                }}>
                                    <li><CheckCircleSharpIcon sx={{ color: 'green', fontSize: '1rem' }} /> {item.list}</li>
                                    <li><CheckCircleSharpIcon sx={{ color: 'green', fontSize: '1rem' }} /> Weekly live sessions</li>
                                    <li><CheckCircleSharpIcon sx={{ color: 'green', fontSize: '1rem' }} /> 24/7 chat support</li>
                                </ul>
                                <Button onClick={(e) => { handleSubscription(e, product.id) }}
                                    variant="contained"
                                    sx={{
                                        width: '100%',
                                        mt: 2,
                                        borderRadius: '0.7rem',
                                        backgroundColor: item.end,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: item.start,
                                            color: '#325343'
                                        }
                                    }}
                                >
                                    Subscribe
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
                    );
                })}

            </Box>
        </Box>
    );
};

export default PaymentComponent