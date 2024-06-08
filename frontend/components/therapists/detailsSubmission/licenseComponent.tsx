import { toast } from 'react-toastify';
import { Box, MenuItem, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CountrySelect from './countryComponent';

interface LicenseComponentProps {
    licenseNo: string;
    country: string;
    expiryDate: Date;
    experience: string;
    gender: string;
    setCountry: React.Dispatch<React.SetStateAction<string>>;
    setExpiryDate: React.Dispatch<React.SetStateAction<Date>>;
    setLicenseField: React.Dispatch<React.SetStateAction<boolean>>;
    setExperience: React.Dispatch<React.SetStateAction<string>>;
    setGender: React.Dispatch<React.SetStateAction<string>>;
    setDescriptionField: React.Dispatch<React.SetStateAction<boolean>>;
}


const experienceOptions = [
    '1-2 years',
    '2-5 years',
    '5-10 years',
    '10+ years'
];

export const genderOptions=[
    'Male',
    "Female",
    'Other'
]

const LicenseComponent: React.FC<LicenseComponentProps> = ({
    licenseNo, country, expiryDate, setCountry, experience, setExpiryDate, setLicenseField,
    setExperience, gender, setGender, setDescriptionField }) => {

    const handleNext = () => {
        console.log('countrttttt', country, expiryDate)
        if (!country || !expiryDate || !experience) {
            toast.error('Please fill all details');
            return;
        }
        setLicenseField(false);
        setDescriptionField(true);
    }

    return (
        <>
            <Box sx={{
                mt: 3,
                display: 'flex', justifyContent: 'center',
                alignItems: 'center', flexDirection: 'column',
                gap: '1rem',
                width: '30rem',
                backgroundColor: 'white',
                padding: 4,
                maxWidth: '90%',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '0.6rem',
            }}>
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="License"
                    defaultValue={licenseNo}
                    sx={{ width: '100%' }}
                />
                <CountrySelect setCountry={setCountry} />
                <TextField
                    id="date"
                    label="Expiry Date"
                    type="date"
                    defaultValue=""
                    sx={{ width: '100%' }}

                    InputLabelProps={{
                        shrink: true,
                    }} onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        setExpiryDate(selectedDate);
                    }}
                />
                <TextField
                    id="experience"
                    select
                    label="Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    sx={{ width: '100%' }}
                >
                    {experienceOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="gender"
                    select
                    label="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    sx={{ width: '100%' }}
                >
                    {genderOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    onClick={handleNext}
                    variant="contained"
                    sx={{
                        borderRadius: '0.7rem',
                        maxWidth: '90%', width: '10rem', color: '#325343',
                        backgroundColor: '#a6de9b',
                        '&:hover': {
                            backgroundColor: '#325343',
                            color: 'white'
                        }
                    }}
                >
                    Next
                </Button>
            </Box>
        </>
    );
};

export default LicenseComponent