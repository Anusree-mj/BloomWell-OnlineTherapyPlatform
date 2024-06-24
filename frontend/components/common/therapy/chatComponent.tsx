import { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/system';
import { Avatar, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment, IconButton } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { getChatAction, userStateType } from '@/store/user/userReducer';
import { useDispatch, useSelector } from "react-redux";
import { ChatItem } from '@/store/user/type';
interface ChatComponentProps {
    messageData: {
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
    };
}

const ChatComponent: React.FC<ChatComponentProps> = ({ messageData }) => {
    const socket = io(`${process.env.NEXT_PUBLIC_SERVER_API_URL}`);
    const [message, setMessage] = useState('');

    const chats = useSelector((state: { user: userStateType }) => state.user.chats);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChatAction({
            recieverId: messageData.reciever.recieverId,
            senderId: messageData.sender.senderId
        }));

    }, [messageData.reciever.recieverId, messageData.sender.senderId])

    useEffect(() => {
        if (messageData.sender.senderId !== '') {
            socket.emit('joinRoom', { userId: messageData.sender.senderId, role: messageData.sender.role });
        }
        console.log('messageData:', messageData);

        socket.on('recieve_chatMessage', (data) => {
            console.log('Data reached in recieve_chatMessage:', data);
            const recieverId = data.reciever.recieverId;
            const senderId = data.sender.senderId;
            console.log('Dispatching getChatAction with recieverId:', recieverId, 'and senderId:', senderId);
            dispatch(getChatAction({ recieverId, senderId }));
        });

        return () => {
            socket.off('recieve_chatMessage');
        };
    }, [messageData.sender.senderId]);

    const handleSend = async () => {
        if (message.trim() === '') return;
        const newMessageData = {
            ...messageData,
            message: message,
        };
        console.log('newMessageData:', newMessageData);

        if (newMessageData.sender.senderId !== '') {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/users/chat`,
                { messageData: newMessageData }, { withCredentials: true }
            );
            if (response.status === 200) {
                socket.emit('send_chatMessage', newMessageData);
            }
            setMessage('');
        } else {
            alert('no sender id');
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
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
                    src={messageData.reciever.image !== '' ? messageData.reciever.image : "/broken-image.jpg"} />
                <Typography sx={{ color: '#325343', ml: 2 }}>
                    {messageData.reciever.name}
                </Typography>
            </Box>

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
                {chats && chats.map((item, index) => (
                    <Box key={index} sx={{
                        display: 'flex', mt: 2,
                        justifyContent: item.senderId === messageData.sender.senderId ? 'flex-end' : 'flex-start',
                        width: '100%',
                        padding: '0 1rem'
                    }}>
                        <Box sx={{
                            width: '20rem',display:'flex',
                            maxWidth: '80%',flexDirection:'column',
                            backgroundColor: item.senderId === messageData.sender.senderId ? '#A3E596' : '#325343',
                            alignSelf: 'flex-start',
                            borderRadius: '0.4rem',
                            p: 1,
                            marginLeft: item.senderId !== messageData.sender.senderId ? 1 : '0',
                            marginRight: item.senderId === messageData.sender.senderId ? 1 : '0',
                        }}>
                            <Typography sx={{
                                color: item.senderId === messageData.sender.senderId ? '#325343' : 'white',
                                ml: 2
                            }}>
                                {item.message}
                            </Typography>
                            <Typography sx={{
                               color: item.senderId === messageData.sender.senderId ? '#325343' : 'white',
                               fontSize: '0.8rem',
                              alignSelf:'end'
                            }}>
                                {formatTime(item.createdAt)}
                            </Typography>
                        </Box>
                    </Box>
                ))}

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
        </Box >
    );
};

export default ChatComponent;
