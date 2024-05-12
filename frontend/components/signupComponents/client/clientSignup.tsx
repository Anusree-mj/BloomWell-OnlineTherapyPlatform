import * as React from 'react';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios'

interface ClientSignUpComponentProps {
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>;
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    confrmPassword: string,
    setConfrmPassword: React.Dispatch<React.SetStateAction<string>>;
    setSignupField: React.Dispatch<React.SetStateAction<boolean>>;
    setOtpField: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClientSignupComponent: React.FC<ClientSignUpComponentProps> = ({ name, setName, email, setEmail,
    password, setPassword, confrmPassword, setConfrmPassword, setSignupField, setOtpField }) => {

    const [loading, setLoading] = React.useState(false)

    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            setLoading(true)
            if (!name || !email || !password || !confrmPassword) {
                toast.error('All fields are required')
                return;
            } else if (password !== confrmPassword) {
                toast.error(`Password doesn't match`)
                return;
            }
            const response = await axios.post(`http://localhost:8000/client/getOtp`, { email: email });
            if (response) {
                setSignupField(false);
                setOtpField(true);
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <FormControl sx={{
                width: '30rem', backgroundColor: 'white',
                padding: 4, maxWidth: '90%', minHeight: '50vh',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '0.6rem',
            }}>
                <TextField id="outlined-basic" label="Name" variant="outlined"
                    required
                    sx={{
                        maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2',
                    }} onChange={(e) => { setName(e.target.value) }}
                />
                <TextField id="outlined-basic" label="Email" variant="outlined"
                    required
                    sx={{
                        maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2', mt: 2
                    }} onChange={(e) => { setEmail(e.target.value) }}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    required
                    sx={{
                        maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2',
                        mt: 2
                    }} onChange={(e) => { setPassword(e.target.value) }}
                />
                <TextField
                    id="outlined-password-input"
                    label="Confirm Password"
                    type="password"
                    required
                    sx={{
                        maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2',
                        mt: 2
                    }} onChange={(e) => { setConfrmPassword(e.target.value) }}
                />
                <LoadingButton
                    onClick={handleSignup}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    sx={{
                        mt: 3, borderRadius: '2rem',
                        maxWidth: '90%', width: '30rem', color: '#325343',
                        backgroundColor: '#a6de9b',
                        '&:hover': {
                            backgroundColor: '#325343',
                            color: 'white'
                        }
                    }}
                >
                    Continue
                </LoadingButton>
            </FormControl>
        </>
    )
}
export default ClientSignupComponent;