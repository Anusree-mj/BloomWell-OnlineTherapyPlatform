import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/system';
import { Avatar, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment, IconButton } from '@mui/material';
import { io } from 'socket.io-client';
import axios from 'axios';
import { getChatAction, userStateType } from '@/store/user/userReducer';
import { useDispatch, useSelector } from "react-redux";
import { format, isToday, isYesterday, isThisWeek, parse, isWithinInterval, addHours } from 'date-fns';
import EmojiPicker, { Theme } from "emoji-picker-react";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import { clientStateType } from "@/store/clients/clientReducer";
import { toast } from 'react-toastify';
import { BookedSlotsItems } from '@/store/clients/type';

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
    slotDetails?: BookedSlotsItems
}

const ChatComponent: React.FC<ChatComponentProps> = ({ messageData, slotDetails }) => {
    const socket = io(`${process.env.NEXT_PUBLIC_SERVER_API_URL}`);
    const [message, setMessage] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [showEmoji, setShowEmoji] = useState<boolean>(false);
    const [isOnline, setIsOnline] = useState(false)
    const chats = useSelector((state: { user: userStateType }) => state.user.chats);
    const clientDetails = useSelector((state: { client: clientStateType }) => state.client.client);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (messageData.reciever.recieverId !== '' && messageData.sender.senderId !== '') {
            dispatch(getChatAction({
                recieverId: messageData.reciever.recieverId,
                senderId: messageData.sender.senderId
            }));
        }
    }, [messageData.reciever.recieverId, messageData.sender.senderId]);

    useEffect(() => {
        if (messageData.sender.senderId !== '') {
            socket.emit('joinRoom', { userId: messageData.sender.senderId, role: messageData.sender.role });
            socket.on('getUsers', (data: any) => {
                console.log('dataaa', data);
                const userIdExists = data.some((user: any) => user.userId === messageData.reciever.recieverId);
                if (userIdExists) {
                    setIsOnline(true)
                }
            })
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
                dispatch(getChatAction({
                    recieverId: messageData.reciever.recieverId,
                    senderId: messageData.sender.senderId
                }));
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
    const handleVideoChat = () => {
        console.log('clientdetailsssssssss', clientDetails)
        if (slotDetails) {
            if (!clientDetails.isActiveSlots) {
                toast.error(`Please book a slot for a live session.`)
                return;
            }
            else {
                // console.log('Slot is active and within the 1-hour range:', slotDetails);
                // const currentDateTime = new Date();
                // const slotDate = parse(slotDetails.date, 'dd-MM-yy', new Date());
                // const slotTime = parse(slotDetails.time, 'hh:mm a', new Date());
                // const slotStartTime = new Date(slotDate.setHours(slotTime.getHours(), slotTime.getMinutes()));
                // const slotEndTime = addHours(slotStartTime, 1);

                // if (isWithinInterval(currentDateTime, { start: slotStartTime, end: slotEndTime })) {
                    socket.emit('send_call',
                        {
                            therapistId: messageData.reciever.recieverId, roomId: messageData.sender.senderId,
                            clientName: clientDetails.name
                        });
                    router.push(`/liveSession/${messageData.sender.senderId}/${messageData.sender.senderId}`);
                // } else {
                //     toast.error(`The slot is not currently active. Please check your booking time.`);
                // }
            }
        }
        return;
    }
    return (
        <Box sx={{
            width: '60rem', maxWidth: { xs: '95%', md: '70%' },
            minHeight: '86vh', display: 'flex', flexDirection: 'column', mt: 1,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
        }}>
            <Box sx={{
                backgroundColor: 'white', width: '100%', p: 1,
                display: 'flex', alignItems: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
                justifyContent: 'space-between',
            }}>
                <Box sx={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', width: '10rem', maxWidth: '100%'
                }}>
                    <Avatar sx={{ width: 40, height: 40 }}
                        src={messageData.reciever.image !== '' ? messageData.reciever.image : "/broken-image.jpg"} />
                    <Box sx={{
                        display: 'flex', flexDirection: 'column',
                        width: '100%', ml: 1
                    }}>
                        <Typography sx={{
                            color: '#325343',
                        }}>
                            {messageData.reciever.name}
                        </Typography>
                        {isOnline && (
                            <Typography sx={{ color: '#325343', fontSize: '0.8rem' }}>
                                Online
                            </Typography>
                        )}
                    </Box>
                </Box>
                {messageData.sender.role === 'Client' && (
                    <VideoChatIcon sx={{ color: '#325343', fontSize: '2rem', cursor: 'pointer' }} onClick={handleVideoChat} />
                )}
            </Box>

            <Box
                ref={chatContainerRef}
                sx={{
                    display: "flex", flexDirection: "column", height: '67vh',
                    overflow: "hidden", overflowY: "scroll", backgroundColor: '#F7FCC2'
                }}
            >
                {chats && chats.map((item, index) => (
                    <Box key={index} sx={{
                        mb: 2,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {(index === 0 || new Date(chats[index - 1].createdAt).toDateString() !== new Date(item.createdAt).toDateString()) && (
                            <Typography sx={{
                                color: '#325343', mt: 1, mb: 2,
                                backgroundColor: '#02020212', p: '0 5px'
                            }}>
                                {formatDate(item.createdAt)}
                            </Typography>
                        )}
                        <Box sx={{
                            display: 'flex',
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

            <Box sx={{ position: 'relative' }}>
                <TextField
                    id="outlined-basic"
                    placeholder="Send message"
                    sx={{ width: '100%', backgroundColor: 'white' }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowEmoji((prevState) => !prevState)}>
                                    <EmojiEmotionsIcon />
                                </IconButton>
                                <IconButton onClick={handleSend}>
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Box sx={{ position: 'absolute', bottom: '50px', right: '50px', zIndex: 1000 }}>
                    <EmojiPicker
                        theme={Theme.DARK}
                        height={300}
                        open={showEmoji}
                        searchDisabled={false}
                        lazyLoadEmojis={true}
                        onEmojiClick={(e) => {
                            setMessage((prev) => prev + e.emoji);
                            setShowEmoji(false);
                        }}
                    />
                </Box>
            </Box>
        </Box >
    );
};

export default ChatComponent;
