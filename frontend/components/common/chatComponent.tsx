import React from 'react'
import { Box } from '@mui/system'
import { Avatar, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment, IconButton } from '@mui/material';

interface ChatProps {
    role: {
        image: string;
        name: string;
    }
}

const ChatComponent: React.FC<ChatProps> = ({ role }) => {
    return (
        <Box sx={{
            border: '2px solid #325343', width: '60rem', maxWidth: { xs: '100%', md: '70%' },
            height: { md: '85vh' }, display: 'flex', flexDirection: 'column'
        }}>
            <Box sx={{
                backgroundColor: 'white', width: '100%', p: 1,
                display: 'flex', alignItems: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}>
                <Avatar sx={{ width: 40, height: 40 }}
                    src={role.image !== '' ? role.image : "/broken-image.jpg"} />
                <Typography sx={{ color: '#325343', ml: 2 }}>
                    {role.name}
                </Typography>
            </Box>
            {/* message goes  here */}
            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: '70vh',
                    overflow: "hidden",
                    overflowY: "scroll",
                }}
            >

            </Box>
            <TextField id="outlined-basic" placeholder="Send message"  sx={{
                width: '100%', backgroundColor: 'white', 
            }} 
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton>
                            <SendIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            />

        </Box>
    )
}

export default ChatComponent