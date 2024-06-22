'use client'

import { useState } from "react"
import { DateCalendar, TimePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { Box } from "@mui/system"
import { Button, Typography } from "@mui/material"
import { toast } from "react-toastify"

const BookSlotComponent = () => {
    const [date, setDate] = useState<Dayjs | null>(null);
    const [time, setTime] = useState<Dayjs | null>(null);
    const [spanText, setSpanText] = useState({
        date: '',
        time: ''
    });

    const handleCheckAvailability = () => {
        const valid = checkValidity();
        if (!valid) {
            return;
        } else {
            const formattedDate = date?.format('DD-MM-YY');
            const formattedTime = time?.format('hh:mm A');
            console.log('data in bookslot', formattedDate, formattedTime);
        }
    };

    const checkValidity = () => {
        let isValid = true;
        if (!date) {
            isValid = false;
            handleSpanChange('date');
        }
        if (!time) {
            isValid = false;
            handleSpanChange('time');
        }
        return isValid;
    };

    const handleSpanChange = (key: string) => {
        setSpanText(prevState => ({
            ...prevState,
            [key]: '*This field is required'
        }));
    };

    return (
        <Box sx={{
            display: 'flex', backgroundColor: '#F7FCC2',
            flexDirection: 'column', minHeight: '80vh',
            alignItems: 'center', justifyContent: 'center', pb: 8,
        }}>
            <Typography
                sx={{
                    mt: 2, mb: 2,
                    color: '#325343',
                    fontSize: '1.2rem', fontWeight: 800,
                }}>
                Schedule your next weekly session
            </Typography>
            <Box sx={{
                display: 'flex', flexDirection: 'column', maxWidth: '100%',
                width: '30rem', borderRadius: '1rem',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',
                border: '1px solid green'
            }}>
                <Box sx={{ mt: 2, width: '90%', display: 'flex', gap: 1 }}>
                    <Typography
                        sx={{
                            color: '#325343',
                            fontSize: '1rem', fontWeight: 600,
                        }}>
                        Select a date
                    </Typography>
                    {spanText.date && (
                        <Typography color="error" sx={{ fontSize: '0.8rem', mt: '0.14rem' }}>
                            {spanText.date}
                        </Typography>
                    )}
                </Box>
                <DateCalendar
                    disablePast
                    sx={{ width: '90%' }}
                    value={date}
                    onChange={(newDate) => setDate(dayjs(newDate))}
                />
                <Box sx={{ mt: 2, width: '90%', display: 'flex', gap: 1 }}>
                    <Typography
                        sx={{
                            color: '#325343',
                            fontSize: '1rem', fontWeight: 600,
                        }}>
                        Select a time
                    </Typography>
                    {spanText.time && (
                        <Typography color="error" sx={{ fontSize: '0.8rem', mt: '0.14rem' }}>
                            {spanText.time}
                        </Typography>
                    )}
                </Box>
                <TimePicker
                    views={['hours', 'minutes']}
                    sx={{ width: '90%' }}
                    value={time}
                    onChange={(newTime) => setTime(dayjs(newTime))}
                />
                <Button
                    onClick={handleCheckAvailability}
                    sx={{
                        mt: 3, mb: 3, color: 'white', backgroundColor: '#325343',
                        display: 'block', fontWeight: 600,
                        '&:hover': {
                            backgroundColor: '#a6de9b',
                            color: '#325343'
                        }
                    }}
                    variant="contained"
                >
                    Check Availability
                </Button>
            </Box>
        </Box>
    );
};

export default BookSlotComponent;
