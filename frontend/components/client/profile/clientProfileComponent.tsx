import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { getClientDetailsAction, clientStateType } from "@/store/clients/clientReducer";
import PersonalInfoComponent from "./personalInfoComponent";
import MedicalInfoComponent from "./medicalInfoComponent";
import ConnectionInfoComponent from "./connectionInfoComponent";
import SubscriptionInfoComponent from "./subscriptionInfoComponent";
import PasswordComponent from "./passwordComponent";

const ClientProfileComponent = () => {
    const dispatch = useDispatch();
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
        connectedAt: ''
    })
    const [subscriptionInfoItems, setSubscriptionInfoItems] = useState({
        subscribedFor: 'Nil',
        expiresAt: 'Nil',
        subscribedAt: 'sdf'
    })

    useEffect(() => {
        const clientData = localStorage.getItem("clientData");
        if (clientData) {
            dispatch(getClientDetailsAction());
        } else {
            router.push('/login');
        }
    }, []);

    useEffect(() => {
        if (clientDetails && Array.isArray(clientDetails) && clientDetails.length > 0) {
            const client = clientDetails[0];
            setPersonalInfoItems({
                name: client.name || '',
                email: client.email || '',
                age: client.age || '',
                sessionType: client.sessionType || ''
            });

            setMedicalInfoItems({
                sessionType: client.sessionType,
                questionnaire: client.questionnaire
            })
            if (client.connectionDetails) {
                setConnectionInfoItems({
                    therapistId: client.therapistDetails._id,
                    therapistName: client.therapistDetails.name,
                    connectionId: client.connectionDetails._id,
                    connectionStatus: client.connectionDetails.isActive,
                    connectedAt: new Date(client.connectionDetails?.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })
                })
            }
            setHasConnectionInfo(true)
        }
    }, [clientDetails])

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
            <Box sx={{ width: '100%', maxWidth: '90%' }}>

                <Typography sx={{
                    alignSelf: 'flex-start',ml:'0.3rem',
                    color: '#325343', fontWeight: 800, fontSize: '1.5rem', mt: 4
                }}>My Profile</Typography>
                <PersonalInfoComponent personalInfoItems={personalInfoItems} />
                <MedicalInfoComponent medicalInfoItems={medicalInfoItems} />
                < ConnectionInfoComponent connectionInfoItems={connectionInfoItems}
                    hasConnectionInfo={hasConnectionInfo} />
                <SubscriptionInfoComponent SubscriptionItems={subscriptionInfoItems} />
                <PasswordComponent />
            </Box>
        </Box>
    );
};

export default ClientProfileComponent;
