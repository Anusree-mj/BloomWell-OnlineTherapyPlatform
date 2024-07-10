import React, { useEffect, useState } from 'react';
import { Box, Typography, Checkbox, Button, FormControlLabel, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from "react-redux";
import { getAvailableSlotsAction, clientMyActivityStateType } from '@/store/clients/clientMyActionReducer';
import { styled } from '@mui/system';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

const AvailableDate = styled('div')(({ theme }) => ({
    backgroundColor: '#76c7c0',
    color: 'white',
    borderRadius: '50%',
    padding: '0.5rem',
}));

const AddAvailabilityForm = () => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    const [therapistId, setTherapistId] = useState<string>('');
    const slots = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.slots);
    const availableFrom = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.availableFrom);
    const availableTo = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.availableTo);

    const dispatch = useDispatch();

    useEffect(() => {
        const therapistData = localStorage.getItem('therapistData');
        if (therapistData) {
            const parsedData = JSON.parse(therapistData);
            setTherapistId(parsedData._id);
            dispatch(getAvailableSlotsAction(parsedData._id));
        }
    }, [dispatch]);

    const handleCheckboxChange = (day: string) => {
        const currentIndex = selectedDays.indexOf(day);
        const newSelectedDays = [...selectedDays];

        if (currentIndex === -1) {
            newSelectedDays.push(day);
        } else {
            newSelectedDays.splice(currentIndex, 1);
        }

        setSelectedDays(newSelectedDays);
    };

    const isAvailableDate = (date: Date, slots: string[]) => {
        return slots.some(slot => {
            const slotDate = new Date(slot);
            const slotDay = slotDate.toLocaleString('en-US', { weekday: 'long' }).toUpperCase(); // Get day like "MONDAY"
            const dateDay = date.toLocaleString('en-US', { weekday: 'long' }).toUpperCase(); // Get day like "MONDAY"
            return slotDay === dateDay;
        });
    };

    const tileClassName = ({ date }: { date: Date }) => {
        return isAvailableDate(date, slots) ? 'available-date' : '';
    };

    const tileContent = ({ date }: { date: Date }) => {
        if (isAvailableDate(date, slots)) {
            return <AvailableDate>{date.getDate()}</AvailableDate>;
        }
        return null;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (selectedDays.length === 0) {
                toast.error('Select at least one day');
                return;
            }
            if (!startTime || !endTime) {
                toast.error('Select a time');
                return;
            }
            const rrule = `FREQ=WEEKLY;BYDAY=${selectedDays.map(day => day.slice(0, 2)).join(',')}`;
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_API_URL}/therapist/addAvailability`,
                { availability: rrule, startTime, endTime },
                { withCredentials: true }
            );
            if (response.status === 200) {
                toast.success('Available Days successfully added');
                dispatch(getAvailableSlotsAction(therapistId));
                setIsEdit(false)
            }
        } catch (error) {
            console.error('Error adding availability:', error);
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: '#325343', display: 'flex', alignItems: 'center',
                flexDirection: 'column', justifyContent: 'center', minHeight: '80vh', pb: 4
            }}>
            <Typography
                sx={{
                    mt: 2, mb: 2, color: 'white', fontSize: '1rem', fontWeight: 600,
                }}>
                Days and Time You Preferred
            </Typography>
            <Box
                sx={{
                    width: '80rem', backgroundColor: 'white', maxWidth: '80%',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)', borderRadius: '0.6rem',
                    display: 'flex', flexDirection: 'column', p: 3,
                    alignItems: 'center', justifyContent: 'center',
                }}
            >
                {slots && slots.length > 0 && !isEdit ? (
                    <Box sx={{
                        display: 'flex', flexWrap: 'wrap', maxWidth: '90%',
                        justifyContent: 'center', alignItems: 'center', gap: 3
                    }}>
                        <Calendar
                            tileClassName={({ date }) => tileClassName({ date })}
                            tileContent={({ date }) => tileContent({ date })}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf: 'start', maxWidth: '90%' }}>

                            <Typography
                                sx={{
                                    mt: 2, mb: 1, color: '#325343', fontSize: '1rem', fontWeight: 600,
                                }}>
                                Time you preferred : {dayjs(availableFrom).format('hh:mm A')} - {dayjs(availableTo).format('hh:mm A')}
                            </Typography>
                            <Button variant="contained"
                                sx={{
                                    backgroundColor: '#325343', width: '20rem', maxWidth: '90%',
                                    '&:hover': {
                                        backgroundColor: '#49873D',
                                        color: 'white',
                                    }
                                }} onClick={() => setIsEdit(true)}>
                                Edit Availability
                            </Button>
                        </Box>

                    </Box>
                ) : (
                    <Box sx={{ width: '30rem', maxWidth: '90%' }}>
                        <Typography
                            sx={{
                                alignSelf: 'start',
                                color: '#325343', fontSize: '1rem', fontWeight: 600, mb: 2
                            }}>
                            Set your weekly available days and times. Changes will apply to every week from now on. You can update your availability anytime.
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                                flexWrap: 'wrap', gap: '2.5rem', width: '30rem',
                                maxWidth: '90%',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    flexDirection: 'column',
                                    width: '30rem',
                                    maxWidth: '90%',
                                }}
                            >
                                <Typography
                                    sx={{
                                        mb: 1, fontWeight: 600,
                                        color: '#325343', fontSize: '0.8rem',
                                    }}
                                >
                                    Schedule your available days
                                </Typography>
                                <Divider sx={{ width: '80%' }} />
                                <Box
                                    sx={{
                                        display: 'grid', p: 1,
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        gap: '8px', width: '30rem', maxWidth: '90%',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {daysOfWeek.map((day) => (
                                        <FormControlLabel 
                                            key={day}
                                            control={
                                                <Checkbox
                                                    checked={selectedDays.includes(day)}
                                                    onChange={() => handleCheckboxChange(day)}
                                                    color="success"
                                                />
                                            }
                                            label={day}
                                        />
                                    ))}
                                </Box>
                            </Box>
                            <Box sx={{
                                display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start',
                                flexDirection: 'column', width: '30rem', maxWidth: '90%',
                            }}>
                                <Typography
                                    sx={{
                                        alignSelf: 'flex-start',
                                        mb: 1, color: '#325343',
                                        fontSize: '0.9rem', fontWeight: 600,
                                    }}
                                >
                                    Schedule your available time
                                </Typography>
                                <Divider sx={{ width: '80%' }} />
                                <Typography
                                    sx={{
                                        mt: 2, color: '#325343',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    Start time
                                </Typography>
                                <TimePicker
                                    views={['hours', 'minutes']}
                                    sx={{ width: '90%' }}
                                    value={startTime}
                                    onChange={(newTime) => setStartTime(dayjs(newTime))}
                                />
                                <Typography
                                    sx={{
                                        mt: 2, color: '#325343',
                                        fontSize: '0.9rem', fontWeight: 600,
                                    }}
                                >
                                    End time
                                </Typography>
                                <TimePicker
                                    views={['hours', 'minutes']}
                                    sx={{ width: '90%' }}
                                    value={endTime}
                                    onChange={(newTime) => setEndTime(dayjs(newTime))}
                                />
                            </Box>
                        </Box>
                        <Divider sx={{ width: '100%', mb: 2 }} />

                        <Button variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: '#325343', width: '10rem', maxWidth: '90%',
                                '&:hover': {
                                    backgroundColor: '#49873D',
                                    color: 'white',
                                }
                            }} onClick={handleSubmit}>
                            Add Availability
                        </Button>
                    </Box>
                )}
            </Box>
        </Box >
    );
};

export default AddAvailabilityForm;
