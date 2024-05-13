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
    const [nameSpan, setNameSpan] = React.useState('black')
    const [nameTextSpan, setNameTextSpan] = React.useState('')
    const [emailSpan, setEmailSpan] = React.useState('black')
    const [emailTextSpan, setEmailTextSpan] = React.useState('')
    const [passwordSpan, setPasswordSpan] = React.useState('black')
    const [passwordTextSpan, setPasswordTextSpan] = React.useState('')
    const [confrmPasswordSpan, setConfrmPasswordSpan] = React.useState('black')
    const [confrmPasswordTextSpan, setConfrmPasswordTextSpan] = React.useState('')

    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const valid = validation()
            if (valid) {
                setLoading(true)
                const response = await axios.post(`http://localhost:8000/client/getOtp`, { email: email });
                if (response) {
                    setSignupField(false);
                    setOtpField(true);
                }
            } else {
                return
            }
        } catch (err) {
            console.log(err)
        }
    }

    const validation = () => {
        let isValid = true
        if (!name) {
            setNameSpan('red')
            isValid = false
        } else if (name.trim() === '') {
            setNameTextSpan('Please provide a valid name')
            isValid = false
        } if (!email) {
            setEmailSpan('red')
            isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailTextSpan('Please provide a valid email.')
            isValid = false
        } if (!password) {
            setPasswordSpan('red')
            isValid = false
        } else if (password.trim() === '') {
            setPasswordTextSpan('Password must be at least 8 characters long')
            isValid = false
        } else if (password.length < 8) {
            setPasswordTextSpan('Password must be at least 8 characters long')
            isValid = false
        } if (!confrmPassword) {
            setConfrmPasswordSpan('red')
            isValid = false
        } else if (password !== confrmPassword) {
            setConfrmPasswordTextSpan(`Password doesn't match`)
            isValid = false
        }
        return isValid
    }

    const clearSpan = (e: { preventDefault: () => void; }, fieldName: string) => {
        e.preventDefault();
        switch (fieldName) {
            case 'name':
                setNameTextSpan('');
                setNameSpan('');
                break;
            case 'email':
                setEmailTextSpan('');
                setEmailSpan(''); 
                break;
            case 'password':
                setPasswordSpan('')
                setPasswordTextSpan('')
                break;
            case 'confrmPassword':
                setConfrmPasswordSpan('')
                setConfrmPasswordTextSpan('')
                break;
            default:
                break;
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
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: nameSpan,
                            },
                        },
                    }} onChange={(e) => { setName(e.target.value) }} 
                    onClick={(e)=>clearSpan(e,'name')}
                />
                <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                >{nameTextSpan}</span>
                <TextField id="outlined-basic" label="Email" variant="outlined"
                    required
                    sx={{
                        maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2', mt: 2,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: emailSpan,
                            },
                        },
                    }} onChange={(e) => { setEmail(e.target.value) }} 
                    onClick={(e)=>clearSpan(e,'email')}
                />
                <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                >{emailTextSpan}</span>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    required
                    sx={{
                        maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2',
                        mt: 2,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: passwordSpan,
                            },
                        },
                    }} onChange={(e) => { setPassword(e.target.value) }} 
                    onClick={(e)=>clearSpan(e,'password')}
                />
                <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                >{passwordTextSpan}</span>
                <TextField
                    id="outlined-password-input"
                    label="Confirm Password"
                    type="password"
                    required
                    sx={{
                        maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2',
                        mt: 2,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: confrmPasswordSpan,
                            },
                        },
                    }} onChange={(e) => { setConfrmPassword(e.target.value) }}
                    onClick={(e)=>clearSpan(e,'confrmPassword')}
                />
                <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                >{confrmPasswordTextSpan}</span>
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