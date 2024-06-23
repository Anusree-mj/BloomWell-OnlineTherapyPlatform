import { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/system';
import { Avatar, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment, IconButton } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';

interface ChatComponentProps {
    reciever: {
        role: string;
        image: string;
        name: string;
        recieverId: string;
    };
    sender: {
        senderId: string;
        role: string;
    };
}

const ChatComponent: React.FC<ChatComponentProps> = ({ reciever, sender }) => {
    const socket = io(`${process.env.NEXT_PUBLIC_SERVER_API_URL}`);
    const [message, setMessage] = useState('');
    const [count, setCount] = useState(0)
    useEffect(() => {
        socket.emit('joinRoom', { userId: sender.senderId, role: sender.role });

        socket.on('recieve_chatMessage', (data) => {
            console.log('Data reached in recieve_chatMessage:', data);
        });

        return () => {
            socket.off('recieve_chatMessage');
        };
    }, [sender.senderId]);

    const handleSend = async () => {
        if (message.trim() === '') return;

        const messageData = {
            recieverId: reciever.recieverId,
            recieverRole: reciever.role,
            senderId: sender.senderId,
            senderRole: sender.role,
            message: message,
        };

        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/users/chat`,
            { messageData }, { withCredentials: true, }
        );
        if (response.status === 200) {
            socket.emit('send_chatMessage', messageData)
        }
        setMessage('');
    };

    return (
        <Box sx={{
            border: '2px solid #325343', width: '60rem', maxWidth: { xs: '95%', md: '70%' },
            minHeight: { md: '80vh' }, display: 'flex', flexDirection: 'column',
        }}>
            <Box sx={{
                backgroundColor: 'white', width: '100%', p: 1,
                display: 'flex', alignItems: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}>
                <Avatar sx={{ width: 40, height: 40 }}
                    src={reciever.image !== '' ? reciever.image : "/broken-image.jpg"} />
                <Typography sx={{ color: '#325343', ml: 2 }}>
                    {reciever.name}
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
                {/* Messages will be rendered here */}
            </Box>
            <TextField id="outlined-basic" placeholder="Send message" sx={{
                width: '100%', backgroundColor: 'white',
            }} value={message} onChange={(e) => setMessage(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleSend}>
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default ChatComponent;
