import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import MedicalInfoComponent from "@/components/client/profile/details/medicalInfoComponent";
import { useRouter } from "next/navigation";
import { getAnyClientDetailsAction,clientStateType } from "@/store/clients/clientReducer";

const ClientMedicalInfoViewComponent: React.FC<{ clientId: string; }> = ({ clientId }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const clientDetails = useSelector((state: { client: clientStateType }) => state.client.client);
    const [medicalInfoItems, setMedicalInfoItems] = useState({
        sessionType: '',
        questionnaire: []
    })

    useEffect(() => {
        console.log('clientid is ',clientId)
        const adminData = localStorage.getItem("adminData");
        const therapistData = localStorage.getItem('therapistData');
        if (!adminData || !therapistData) {
            router.push('/login')
        }
        dispatch(getAnyClientDetailsAction({ clientId }));
    }, []);
    useEffect(() => {
        setMedicalInfoItems({
            sessionType: clientDetails.sessionType,
            questionnaire: clientDetails.questionnaire
        })
    }, [clientDetails])

    return (
        <Box
            sx={{
                backgroundColor: '#F7FCC2',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '90vh',
                paddingBottom: '2rem'
            }}
        >
            <Box sx={{ width: '100%', maxWidth: '90%' }}>

                <Typography sx={{
                    ml: '0.3rem',
                    color: '#325343', fontWeight: 800, fontSize: '1.5rem', mt: 6
                }}>Client Medical Info</Typography>
                <MedicalInfoComponent medicalInfoItems={medicalInfoItems} readOnly={true} />
            </Box>
        </Box>
    );
};

export default ClientMedicalInfoViewComponent;
