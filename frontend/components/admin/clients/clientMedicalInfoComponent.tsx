import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import MedicalInfoComponent from "@/components/client/profile/details/medicalInfoComponent";
import { useRouter } from "next/navigation";
import { getAnyClientDetailsAction, clientStateType } from "@/store/clients/clientReducer";

const ClientMedicalInfoViewComponent: React.FC<{ clientId: string; }> = ({ clientId }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const clientDetails = useSelector((state: { client: clientStateType }) => state.client.client);
    const [medicalInfoItems, setMedicalInfoItems] = useState({
        sessionType: '',
        questionnaire: []
    })

    useEffect(() => {
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
                backgroundColor: '#325343',
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
                    color: 'white', fontWeight: 800, fontSize: '1rem', mt: 6
                }}>Client Medical Info</Typography>
                <MedicalInfoComponent medicalInfoItems={medicalInfoItems} readOnly={true} />
            </Box>
        </Box>
    );
};

export default ClientMedicalInfoViewComponent;
