import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { therapistStateType } from '@/store/therapists/therapistReducers';
import PersonalInfoComponent from "./personalComponent";
import AboutInfoComponent from "./aboutComponent";
import ProffessionalInfoComponent from "./experienceExpertiseComponent";
import PasswordComponent from "@/components/client/profile/details/passwordComponent";

const TherapistProfileComponent = () => {
    const therapistDetails = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);
    const router = useRouter();
    const [personalInfoItems, setPersonalInfoItems] = useState({
        name: '',
        email: '',
        phone: 0,
        image: '',
        gender: '',
        role: ''
    })
    const [description, setDescription] = useState('')
    const [proffessionalInfo, setProffessionalInfo] = useState({
        licenseNo: '',
        country: '',
        licenseImage: '',
        experience: '',
        expertise: []
    })

    useEffect(() => {
        const therapistData = localStorage.getItem("therapistData");
        if (!therapistData) {
            router.push('/login');
        }
    }, []);

    useEffect(() => {
        setPersonalInfoItems({
            name: therapistDetails.name,
            email: therapistDetails.email,
            phone: therapistDetails.phone,
            image: therapistDetails.image,
            gender: therapistDetails.gender,
            role: therapistDetails.role
        });

        setDescription(therapistDetails.description)
        setProffessionalInfo({
            licenseNo: therapistDetails.license.licenseNo,
            country: therapistDetails.license.country || '',
            licenseImage: therapistDetails.license.licenseProof || '',
            experience: therapistDetails.experience,
            expertise: therapistDetails.expertise
        })
    }, [therapistDetails])

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
                    alignSelf: 'flex-start', ml: '0.3rem',
                    color: '#325343', fontWeight: 800, fontSize: '1.5rem', mt: 4
                }}>My Profile</Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Avatar src={personalInfoItems.image} sx={{
                        width: 200, height: 200,
                        alignSelf: 'center'
                    }} />
                    <Button variant="contained"
                        sx={{ mt: 1, backgroundColor: '#325343' }}
                    >Change</Button>
                </Box>
                <PersonalInfoComponent personalInfoItem={personalInfoItems} />
                <AboutInfoComponent description={description} />
                <ProffessionalInfoComponent proffessionalInfo={proffessionalInfo} />
                <PasswordComponent role='therapist'/>
            </Box>
        </Box>
    );
};

export default TherapistProfileComponent;
