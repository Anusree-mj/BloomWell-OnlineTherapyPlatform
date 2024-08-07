'use client'
import { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { saveTherapistDetailsAction, therapistStateType } from '@/store/therapists/therapistReducers';
import ExpertiseComponent from './expertiseComponent';
import LicenseComponent from './licenseComponent';
import DescriptionComponent from './descriptionComponent';
import ProfileComponent from './profilePhotoComponents';
import { toast } from 'react-toastify';

const DetailsComponent = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector((state: { therapist: therapistStateType }) => state.therapist.isLoading);
    const error = useSelector((state: { therapist: therapistStateType }) => state.therapist.error);
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [licenseNo, setLicenseNo] = useState('')
    const [expertise, setExpertise] = useState<string[]>([]);
    const [gender, setGender] = useState('');
    const [expertiseField, setExpertiseField] = useState(true);
    const [country, setCountry] = useState('');
    const [expiryDate, setExpiryDate] = useState<Date>(new Date);
    const [experience, setExperience] = useState('');
    const [licenseField, setLicenseField] = useState(false);
    const [description, setDescription] = useState('')
    const [descriptionField, setDescriptionField] = useState(false);
    const [image, setImage] = useState('')
    const [photoField, setPhotoField] = useState(false);
    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
        const therapistData = JSON.parse(localStorage.getItem('therapistData') || '{}');
        const { email, license, image } = therapistData
        if (image) {
            router.push('/therapist/activities/active')
        }
        const { licenseNo } = license
        setEmail(email);
        setLicenseNo(licenseNo);
    }, [])

    useEffect(() => {
        toast.error(error);
    }, [error])


    const saveTherapistData = () => {
        dispatch(saveTherapistDetailsAction({
            email, licenseNo, expertise, country, expiryDate, experience,gender, description,
            image, handleSaveTherapistDataSuccess
        }))
    }

    const handleSaveTherapistDataSuccess = () => {
        router.push('/therapist/')
    }
    return (
        <Box sx={{
            backgroundColor: '#325343', display: 'flex',
            justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
            minHeight: '85vh', paddingBottom: '4rem'
        }}>
            {expertiseField && (
                <>
                    <Typography sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem' }, mt: 2,
                        textAlign: 'center', color: 'white',
                    }}>
                        Areas Of Expertise
                    </Typography>
                    <ExpertiseComponent expertise={expertise}
                        setExpertise={setExpertise} setLicenseField={setLicenseField}
                        setexpertiseField={setExpertiseField} />
                </>
            )}
            {licenseField && (
                <>
                    <Typography sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem' }, mt: 2,
                        textAlign: 'center', color: 'white',
                    }}>
                        Add your license information
                    </Typography>
                    <LicenseComponent licenseNo={licenseNo} country={country}
                        expiryDate={expiryDate}
                        setCountry={setCountry} experience={experience}
                        setExpiryDate={setExpiryDate}
                        setLicenseField={setLicenseField}
                        setExperience={setExperience} gender={gender} setGender={setGender}
                        setDescriptionField={setDescriptionField} />
                </>
            )}
            {descriptionField && (
                <>
                    <Typography sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem' }, mt: 2,
                        textAlign: 'center', color: 'white',
                    }}>
                        Describe yourself to clients
                    </Typography>
                    <DescriptionComponent
                        description={description}
                        setDescription={setDescription}
                        setDescriptionField={setDescriptionField}
                        setPhotoField={setPhotoField}
                    />
                </>
            )}
            {photoField && (
                <>
                    <Typography sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem' }, mt: 2,
                        textAlign: 'center', color: 'white',
                    }}>
                        Add your profile photo
                    </Typography>
                    <ProfileComponent
                        image={image}
                        setImage={setImage}
                        setDisableButton={setDisableButton}
                    />
                    <LoadingButton
                        disabled={!disableButton}
                        loading={isLoading}
                        variant="contained"
                        sx={{
                            borderRadius: '0.7rem', mt: 2,
                            maxWidth: '90%', width: '10rem', color: '#325343',
                            backgroundColor: '#a6de9b',
                            '&:hover': {
                                backgroundColor: '#325343',
                                color: 'white'
                            }
                        }} onClick={saveTherapistData}
                    >
                        Continue
                    </LoadingButton>
                </>
            )}
        </Box>
    )

}
export default DetailsComponent;