import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getClientDetailsAction, clientStateType } from "@/store/clients/clientReducer";
import { Box } from '@mui/system';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import axios from 'axios';



interface EditPersonalInfoProps {
    setEditMedicalInfo: React.Dispatch<React.SetStateAction<boolean>>;
    questions: {
        question: string,
        options: string[]
    }[]
}

interface MedicalInfo {
    questionnaire: string[]
}


const EditMedicalInfoComponent: React.FC<EditPersonalInfoProps> = ({ setEditMedicalInfo, questions }) => {
    const clientDetails = useSelector((state: { client: clientStateType }) => state.client.client);
    const dispatch = useDispatch()

    const [isChange, setIsChange] = useState(false);
    const [editMedicalInfos, setEditMedicalInfos] = useState<MedicalInfo>({
        questionnaire: clientDetails.questionnaire
    })

    const handleInputChange = (index: number, value: string) => {
        setIsChange(true)
        setEditMedicalInfos(prevState => {
            const newQuestionnaire = [...prevState.questionnaire];
            newQuestionnaire[index] = value;
            return { ...prevState, questionnaire: newQuestionnaire };
        });
    };

    const handleEdit = async () => {
        try {
            if (!isChange) {
                setEditMedicalInfo(false);
                return;
            }
            const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/client/profile/medical`,
                { medicalInfo: editMedicalInfos }, { withCredentials: true, });
            if (response.status === 200) {
                setEditMedicalInfo(false)
                dispatch(getClientDetailsAction())
            }

        } catch (err) {
            console.log('Error found:', err)
        }
    }

    return (
        <Box sx={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-around', width: '80rem', maxWidth: '100%',
        }}>
            {questions.map((item, index) => (
                <Box sx={{
                    display: 'flex', flexDirection: 'column', mt: 3, maxWidth: '90%'
                }}>
                    <Typography sx={{
                        color: '#325343',
                        fontWeight: '600'
                    }}>{item.question}</Typography>
                    <TextField
                        id=""
                        select
                        value={editMedicalInfos.questionnaire[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        sx={{
                            mt: 1,
                            maxWidth: '100%', width: '30rem',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}
                    >
                        {item.options.map((option) => (

                            <MenuItem value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            ))}

            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                maxWidth: '100%', justifyContent: 'center', width: '50rem'
            }}>
                <Button variant="outlined"
                    sx={{
                        mt: 5, width: '30rem', maxWidth: '90%',
                        color: '#325343', border: '2px solid #325343',
                        '&:hover': {
                            backgroundColor: '#95C08D',
                            color: '#325343',
                            border: '2px solid #95C08D'
                        },
                    }} onClick={handleEdit}
                >Edit</Button>
                <Button variant="contained"
                    sx={{
                        mt: 2, backgroundColor: '#325343', width: '30rem', maxWidth: '90%',
                        '&:hover': {
                            backgroundColor: '#49873D',
                            color: 'white',
                        }
                    }} onClick={() => { setEditMedicalInfo(false) }}
                >Cancel</Button>
            </Box>
        </Box>
    )
}

export default EditMedicalInfoComponent