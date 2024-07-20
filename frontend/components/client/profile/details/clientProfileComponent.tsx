import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { clientStateType } from "@/store/clients/clientReducer";
import PersonalInfoComponent from "./personalInfoComponent";
import MedicalInfoComponent from "./medicalInfoComponent";
import ConnectionInfoComponent from "./connectionInfoComponent";
import SubscriptionInfoComponent from "./subscriptionInfoComponent";
import PasswordComponent from "./passwordComponent";

const ClientProfileComponent = () => {
    const clientDetails = useSelector((state: { client: clientStateType }) => state.client.client);
    const router = useRouter();
    const [hasConnectionInfo, setHasConnectionInfo] = useState(false)
    const [personalInfoItems, setPersonalInfoItems] = useState({ name: '', email: '', age: '', sessionType: '' })
    const [medicalInfoItems, setMedicalInfoItems] = useState({
        sessionType: '',
        questionnaire: []
    }) 
    const [connectionInfoItems, setConnectionInfoItems] = useState({
        therapistId: '',
        therapistName: '',
        connectionId: '',
        connectionStatus: false,
        connectedAt: '',
        isConnected: false
    })
    const [subscriptionInfoItems, setSubscriptionInfoItems] = useState({
        stripeCustomerId: '',
        stripeSubscriptionId: '',
        stripePriceId: '',
        stripeCurrentPeriodEnd: '',
        stripeCurrentPeriodStart: '',
        stripeTrialEnd: '',
        amount: 0,
        status: ''
    })
   
    useEffect(() => {
        setPersonalInfoItems({
            name: clientDetails.name || '',
            email: clientDetails.email || '',
            age: clientDetails.age || '',
            sessionType: clientDetails.sessionType || ''
        });
        setMedicalInfoItems({
            sessionType: clientDetails.sessionType,
            questionnaire: clientDetails.questionnaire
        })
        if (clientDetails.connectionDetails) {
            setConnectionInfoItems({
                therapistId: clientDetails.therapistDetails._id,
                isConnected: clientDetails.isConnected,
                therapistName: clientDetails.therapistDetails.name,
                connectionId: clientDetails.connectionDetails._id,
                connectionStatus: clientDetails.connectionDetails.isActive,
                connectedAt: new Date(clientDetails.connectionDetails?.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })
            })
        }
        setSubscriptionInfoItems({
            stripeCustomerId: clientDetails.subscription.stripeCustomerId,
            stripeSubscriptionId: clientDetails.subscription.stripeSubscriptionId,
            stripePriceId: clientDetails.subscription.stripePriceId,
            stripeCurrentPeriodEnd: clientDetails.subscription.stripeCurrentPeriodEnd,
            stripeCurrentPeriodStart: clientDetails.subscription.stripeCurrentPeriodStart,
            stripeTrialEnd: clientDetails.subscription.stripeTrialEnd,
            amount: clientDetails.subscription.amount,
            status: clientDetails.subscription.status
        })

        setHasConnectionInfo(true)
    }, [clientDetails])

    return (
        <Box
            sx={{
                backgroundColor: '#325343',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '85vh',
                paddingBottom: '2rem'
            }}
        >
            <Box sx={{ width: '100%', maxWidth: '90%' }}>

                <Typography sx={{
                    alignSelf: 'flex-start', ml: '0.3rem',
                    color: '#325343', fontWeight: 800, fontSize: '1.5rem', mt: 4
                }}>My Profile</Typography>
                <PersonalInfoComponent personalInfoItems={personalInfoItems} />
                <MedicalInfoComponent medicalInfoItems={medicalInfoItems} readOnly={false} />
                < ConnectionInfoComponent connectionInfoItems={connectionInfoItems}
                    hasConnectionInfo={hasConnectionInfo} />
                <SubscriptionInfoComponent SubscriptionItems={subscriptionInfoItems} />
                <PasswordComponent role='client' />
            </Box>
        </Box>
    );
};

export default ClientProfileComponent;
