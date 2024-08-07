import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Typography, Pagination } from '@mui/material';
import { Box } from '@mui/system';
import { getNotificationCountAction, getNotificationsAction, userStateType } from '@/store/user/userReducer';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import axios from 'axios';
import { apiCall } from '@/services/api';

const NotificationsComponent: React.FC<{ userId: string; }> = ({ userId }) => {
    const dispatch = useDispatch();
    const notifications = useSelector((state: { user: userStateType }) => state.user.notifications);
    const [expandedNotifications, setExpandedNotifications] = useState<{ [key: string]: boolean }>({ '': false });
    const [page, setPage] = useState(1);
    const notificationsPerPage = 6;

    useEffect(() => {
        dispatch(getNotificationsAction(userId));
    }, [dispatch]);

    const handleReadNotification = async (notificationId: string, isRead: boolean) => {
        try {
            setExpandedNotifications(prevState => ({
                ...prevState,
                [notificationId]: true
            }));
            if (!isRead) {
                const response = await apiCall({
                    method: 'PUT',
                    endpoint: `users/notifications/${notificationId}`,
                    body: {}
                });
                if (response.status === 'ok') {
                    dispatch(getNotificationsAction(userId));
                    dispatch(getNotificationCountAction({ userId }))
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
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const startIndex = (page - 1) * notificationsPerPage;
    const endIndex = startIndex + notificationsPerPage;
    const paginatedNotifications = notifications.slice(startIndex, endIndex);

    return (
        <Box sx={{
            minHeight: '100vh', pt: 4, pb: 6,
            display: 'flex', flexDirection: 'column', backgroundColor: '#325343',
            alignItems: 'center', justifyContent: 'flex-start',
        }}>
            {paginatedNotifications.map((item) => (
                <Box key={item._id} sx={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', mt: 2,
                    width: '60rem', maxWidth: '90%',
                    p: '0.6rem', borderRadius: '0.5rem', backgroundColor: 'white',
                    boxShadow: '1px 4px 10px rgba(0, 0, 0, 1.1)',
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <Box>
                            <Typography sx={{ fontWeight: item.isRead ? 600 : 800, fontSize: '1rem', color: '#325343' }}>
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
                                onClick={() => {
                                    handleShowMoreToggle(item._id);
                                }}
                            />
                        ) : (
                            <ExpandMoreOutlinedIcon
                                sx={{ fontWeight: item.isRead ? 600 : 800, color: '#325343', fontSize: '2rem' }}
                                onClick={() => {
                                    handleReadNotification(item._id, item.isRead);
                                }}
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
            <Pagination
                count={Math.ceil(notifications.length / notificationsPerPage)}
                page={page}
                onChange={handleChangePage}
                shape="rounded"
                sx={{
                    mt: 5, '& .MuiPaginationItem-root': {
                        color: 'white',
                    },
                }}
            />
        </Box>
    );
};

export default NotificationsComponent;
