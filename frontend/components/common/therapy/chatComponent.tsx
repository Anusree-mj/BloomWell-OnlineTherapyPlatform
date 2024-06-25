import { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/system';
import { Avatar, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment, IconButton } from '@mui/material';
import { io } from 'socket.io-client';
import axios from 'axios';
import { getChatAction, userStateType } from '@/store/user/userReducer';
import { useDispatch, useSelector } from "react-redux";
import { format, isToday, isYesterday, isThisWeek } from 'date-fns';
import EmojiPicker, { Theme } from "emoji-picker-react";

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
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [showEmoji, setShowEmoji] = useState<boolean>(false);

    const chats = useSelector((state: { user: userStateType }) => state.user.chats);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChatAction({
            recieverId: messageData.reciever.recieverId,
            senderId: messageData.sender.senderId
        }));
    }, [messageData.reciever.recieverId, messageData.sender.senderId]);

    useEffect(() => {
        if (messageData.sender.senderId !== '') {
            socket.emit('joinRoom', { userId: messageData.sender.senderId, role: messageData.sender.role });
        }

        socket.on('recieve_chatMessage', (data) => {
            const recieverId = data.reciever.recieverId;
            const senderId = data.sender.senderId;
            dispatch(getChatAction({ recieverId, senderId }));
        });

        return () => {
            socket.off('recieve_chatMessage');
        };
    }, [messageData.sender.senderId]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chats]);

    const handleSend = async () => {
        if (message.trim() === '') return;

        const newMessageData = {
            ...messageData,
            message: message,
        };

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

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        if (isToday(date)) {
            return 'Today';
        } else if (isYesterday(date)) {
            return 'Yesterday';
        } else if (isThisWeek(date, { weekStartsOn: 1 })) {
            return format(date, 'EEEE');
        } else {
            return format(date, 'dd MMM');
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
            minHeight: { md: '75vh' }, display: 'flex', flexDirection: 'column', mt: 1
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
                ref={chatContainerRef}
                sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: '65vh',
                    overflow: "hidden",
                    overflowY: "scroll",
                }}
            >
                {chats && chats.map((item, index) => (
                    <Box key={index} sx={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {(index === 0 || new Date(chats[index - 1].createdAt).toDateString() !== new Date(item.createdAt).toDateString()) && (
                            <Typography sx={{
                                color: '#325343', mt: 2,
                                backgroundColor: '#02020212', p: '0 5px'
                            }}>
                                {formatDate(item.createdAt)}
                            </Typography>
                        )}
                        <Box sx={{
                            display: 'flex', mt: 2,
                            justifyContent: item.senderId === messageData.sender.senderId ? 'flex-end' : 'flex-start',
                            width: '100%',
                            padding: '0 1rem'
                        }}>
                            <Box sx={{
                                width: '20rem', display: 'flex',
                                maxWidth: '80%', flexDirection: 'column',
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
                                    alignSelf: 'end'
                                }}>
                                    {formatTime(item.createdAt)}
                                </Typography>
                            </Box>
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
                            <EmojiPicker
                                theme={Theme.DARK}
                                height={300}
                                searchDisabled={true}
                                open={showEmoji}
                                lazyLoadEmojis={true}
                                className="bg-my-bg-dark"
                                onEmojiClick={(e) => {
                                    setMessage((prev) => prev + e.emoji);
                                }}
                            />
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
