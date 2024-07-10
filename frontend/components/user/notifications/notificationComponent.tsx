import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getNotificationsAction, userStateType } from '@/store/user/userReducer';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import axios from 'axios';

const NotificationsComponent: React.FC<{ userId: string; }> = ({ userId }) => {
    const dispatch = useDispatch();
    const notifications = useSelector((state: { user: userStateType }) => state.user.notifications);
    const [expandedNotifications, setExpandedNotifications] = useState<{ [key: string]: boolean }>({ '': false });

    useEffect(() => {
        const clientData = localStorage.getItem("clientData");
        if (clientData) {
            const parsedData = JSON.parse(clientData);
            dispatch(getNotificationsAction(userId));
        }
    }, [dispatch]);

    const handleReadNotification = async (notificationId: string, isRead: boolean) => {
        try {
            console.log('Reached in axios');
            setExpandedNotifications(prevState => ({
                ...prevState,
                [notificationId]: true
            }));
            if (!isRead) {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/users/notifications/${notificationId}`, {}, { withCredentials: true });
                if (response.data.status === 'ok') {
                    dispatch(getNotificationsAction(userId))
                }
            } else {
                return
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleShowMoreToggle = (notificationId: string) => {
        setExpandedNotifications(prevState => ({
            ...prevState,
            [notificationId]: false
        }));
        console.log('Show more toggled for:', notificationId);
    };

    return (
        <Box sx={{minHeight:'100vh',
            display: 'flex', flexDirection: 'column', backgroundColor: '#325343',
            alignItems: 'center', justifyContent: 'center',
        }}>
            {notifications.map((item) => (
                <Box key={item._id} sx={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', mt: 2,
                    width: '60rem', maxWidth: { sm: '100%', xs: '90%' },
                    p: 3, borderRadius: '1rem', backgroundColor: 'white',
                    boxShadow: '1px 4px 10px rgba(0, 0, 0, 1.1)',
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <Box>
                            <Typography sx={{ fontWeight: item.isRead ? 600 : 800, fontSize: '1.1rem', color: '#325343' }}>
                                {item.head}
                            </Typography>
                            {!expandedNotifications[item._id] && (
                                <Typography sx={{ mt: 1, fontWeight: item.isRead ? 600 : 800, fontSize: '0.8rem', color: '#325343' }}>
                                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </Typography>

                            )}
                        </Box>
                        {expandedNotifications[item._id] ? (
                            <ExpandLessOutlinedIcon
                                sx={{ fontWeight: 200, color: '#325343', fontSize: '2rem' }}
                                onClick={() => { handleShowMoreToggle(item._id); console.log('ExpandLessIcon clicked', item._id); }}
                            />
                        ) : (
                            <ExpandMoreOutlinedIcon
                                sx={{ fontWeight: item.isRead ? 600 : 800, color: '#325343', fontSize: '2rem' }}
                                onClick={() => { handleReadNotification(item._id, item.isRead); console.log('ExpandMoreIcon clicked', item._id); }}
                            />
                        )}
                    </Box>
                    {expandedNotifications[item._id] && (
                        <>
                            <Typography sx={{
                                fontSize: '0.98rem', color: '#325343', mt: 1, width: '100%',
                                textAlign: 'start',
                            }}>
                                {item.message}
                            </Typography>
                            <Typography sx={{
                                mt: 1, fontWeight: item.isRead ? 600 : 800, width: '100%',
                                fontSize: '0.8rem', color: '#325343', textAlign: 'end'
                            }}>
                                {new Date(item.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </Typography>
                        </>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default NotificationsComponent;
