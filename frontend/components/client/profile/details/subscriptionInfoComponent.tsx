import { Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useDispatch, } from "react-redux";
import { getClientDetailsAction } from "@/store/clients/clientReducer";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface SubscriptionInfoProps {
    SubscriptionItems: {
        stripeCustomerId: string,
        stripeSubscriptionId: string,
        stripePriceId: string,
        stripeCurrentPeriodEnd: string,
        stripeCurrentPeriodStart: string,
        stripeTrialEnd: string,
        amount: number,
        status: string,
    },
}

const SubscriptionInfoComponent: React.FC<SubscriptionInfoProps> = ({ SubscriptionItems }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const formatSubscriptionPlan = (amount: number) => {
        let planDetails = '';

        switch (amount) {
            case 5999:
                planDetails = `Premium plan, ₹5,999/- for 1 year`;
                break;
            case 2999:
                planDetails = `Standard plan, ₹2,999/- for  6 m/o`;
                break;
            case 1499:
                planDetails = 'Basic plan, ₹1,499/- for 3 m/o';
                break;
            default:
                planDetails = 'Unknown Plan';
                break;
        }

        return planDetails;
    }
    const subscriptionPlan = formatSubscriptionPlan(SubscriptionItems.amount)
    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };
    const typographyItems = [
        { title: 'Subscription Plan', value: subscriptionPlan },
        { title: 'Subscribed On', value: formatDate(SubscriptionItems.stripeCurrentPeriodStart) },
        { title: 'Trial Ends in', value: formatDate(SubscriptionItems.stripeTrialEnd) },
        { title: 'Expires In', value: formatDate(SubscriptionItems.stripeCurrentPeriodEnd) },
    ]

    const handleCancelSubscription = async () => {
        try {
            console.log('entered in cancel')
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/client/payment/cancel`,
                { stripeSubscriptionId: SubscriptionItems.stripeSubscriptionId },
                { withCredentials: true, }
            );
            if (response.status === 200) {
                dispatch(getClientDetailsAction())
                toast.success('Subscription successfully cancelled')
            }
        } catch (err) {
            console.log('Err found', err)
        }
    }
    const handlePayment = () => {
        router.push('/client/payment')
    }

    const confirmCancelSubscription = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to cancel your subscription?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                handleCancelSubscription();
                dispatch(getClientDetailsAction())
            }
        });
    };


    return (
        <Box sx={{
            backgroundColor: 'white', display: 'flex', mt: '2rem',
            flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.3)',
        }}>
            <Typography sx={{
                fontWeight: 800, fontSize: '1rem', color: '#325343',
                mb: 1
            }}>Subscription Info</Typography>
            <Divider sx={{ mb: 2 }} />
            <>
                {typographyItems.map((item) => (
                    <Box key={item.title} sx={{ display: 'flex', pt: '0.2rem' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#325343' }} >{item.title} : </Typography>
                        <Typography sx={{ fontWeight: 200, fontSize: '1rem', color: '#325343', ml: '0.2rem' }} >{item.value}</Typography>
                    </Box>
                ))}
                {SubscriptionItems.status === 'cancelled' && (
                    <>

                        <Typography sx={{
                            fontWeight: 600, fontSize: '1rem',
                            mt: 1, color: '#931414'
                        }} >
                            You have cancelled your subscription. You can use our service until the subscription period ends </Typography>
                        <Button variant="contained"
                            sx={{
                                maxWidth: '80%', width: '10rem',
                                alignSelf: 'flex-start', mt: 1, backgroundColor: '#325343',
                                '&:hover': {
                                    backgroundColor: '#49873D',
                                    color: 'white',
                                }
                            }} onClick={handlePayment}
                        >Subscribe</Button>
                    </>
                )}
                {SubscriptionItems.status !== 'cancelled' && (
                    <Button variant="contained"
                        sx={{
                            maxWidth: '80%', width: '10rem',
                            alignSelf: 'flex-start', mt: 1, backgroundColor: '#325343',
                            '&:hover': {
                                backgroundColor: '#49873D',
                                color: 'white',
                            }
                        }} onClick={confirmCancelSubscription}
                    >Cancel</Button>
                )}
            </>
        </Box>
    )
}

export default SubscriptionInfoComponent