import React, { useEffect, useState } from 'react';
import { Box, Typography, Checkbox, Button, FormControlLabel } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import Calendar from 'react-calendar'; // Import react-calendar
import 'react-calendar/dist/Calendar.css'; // Import default calendar styles
import { useDispatch, useSelector } from "react-redux";
import { getAvailableSlotsAction, clientMyActivityStateType } from '@/store/clients/clientMyActionReducer';
import { styled } from '@mui/system';

const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

interface TherapistData {
    _id: string;
}

const AvailableDate = styled('div')(({ theme }) => ({
    backgroundColor: '#76c7c0',
    color: 'white',
    borderRadius: '50%',
    padding: '0.5rem',
}));

const AddAvailabilityForm = () => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [therapistId, setTherapistId] = useState<string>('');
    const slots = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.slots);
    const dispatch = useDispatch();

    useEffect(() => {
        const therapistData = localStorage.getItem('therapistData');
        if (therapistData) {
            const parsedData: TherapistData = JSON.parse(therapistData);
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
            const rrule = `FREQ=WEEKLY;BYDAY=${selectedDays.map(day => day.slice(0, 2)).join(',')}`;
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_API_URL}/therapist/addAvailability`,
                { availability: rrule },
                { withCredentials: true }
            );
            if (response.status === 200) {
                toast.success('Available Days successfully added');
                dispatch(getAvailableSlotsAction(therapistId));
            }
        } catch (error) {
            console.error('Error adding availability:', error);
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: '#F7FCC2', display: 'flex', alignItems: 'center',
                flexDirection: 'column', justifyContent: 'center', minHeight: '80vh',
            }}
        >
            <Typography
                sx={{
                    mt: 2, mb: 2, color: '#325343', fontSize: '1.2rem', fontWeight: 800,
                }}
            >
                Choose your available days
            </Typography>
            <Box
                sx={{
                    width: '80rem', backgroundColor: 'white', maxWidth: '80%',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '0.6rem',
                    display: 'flex', flexDirection: 'column', gap: '2rem',
                    alignItems: 'flex-start', justifyContent: 'flex-start', p: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start',
                        flexDirection: 'column', border: '1px solid red',
                    }}
                >
                    <Typography
                        sx={{
                            mt: 2, mb: 2, color: '#325343',
                            fontSize: '0.9rem', fontWeight: 600,
                        }}
                    >
                        Schedule your next weekly session
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {daysOfWeek.map((day) => (
                            <FormControlLabel
                                key={day}
                                control={
                                    <Checkbox
                                        checked={selectedDays.includes(day)}
                                        onChange={() => handleCheckboxChange(day)}
                                        color="success" />}
                                label={day}
                            />
                        ))}
                    </Box>
                    <Button variant="contained"
                        sx={{
                            alignSelf: { sm: 'flex-end' }, mt: 3,
                            backgroundColor: '#325343', width: '10rem', maxWidth: '90%',
                            '&:hover': {
                                backgroundColor: '#49873D',
                                color: 'white',
                            }
                        }} onClick={handleSubmit}>
                        Add Availability
                    </Button>
                </Box>

                {slots && slots.length > 0 && (
                    <Box sx={{ border: '1px solid red' }}>
                        <Calendar
                            tileClassName={({ date }) => tileClassName({ date })}
                            tileContent={({ date }) => tileContent({ date })}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default AddAvailabilityForm;
