import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { getSingleClientsDetailsAction, adminStateType } from "@/store/admin/adminReducer";
import MedicalInfoComponent from "@/components/client/profile/details/medicalInfoComponent";

const ClientMedicalInfoViewComponent: React.FC<{ clientId: string; }> = ({ clientId }) => {
    const dispatch = useDispatch()
    const clientDetails = useSelector((state: { admin: adminStateType }) => state.admin.client);
    const [medicalInfoItems, setMedicalInfoItems] = useState({
        sessionType: '',
        questionnaire: []
    })

    useEffect(() => {
        dispatch(getSingleClientsDetailsAction({ clientId }));
    }, []);
    useEffect(() => {
        setMedicalInfoItems({
            sessionType: clientDetails.sessionType,
            questionnaire: clientDetails.questionnaire
        })
    }, [clientDetails])

    return (
        <Box
            sx={{mt:2,
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
                    ml: '0.3rem',
                    color: '#325343', fontWeight: 800, fontSize: '1.5rem', mt: 6
                }}>Client Medical Info</Typography>
                <MedicalInfoComponent medicalInfoItems={medicalInfoItems} readOnly={true} />
            </Box>
        </Box>
    );
};

export default ClientMedicalInfoViewComponent;
