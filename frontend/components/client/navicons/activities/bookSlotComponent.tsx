'use client'

import { useState } from "react"
import { DateCalendar, DateTimePicker, TimePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { Box } from "@mui/system"
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
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
            <div>
                <h2>Set Recurring Slots</h2>
                <form >
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Frequency</InputLabel>
                        <Select

                        >
                            <MenuItem value="DAILY">Daily</MenuItem>
                            <MenuItem value="WEEKLY">Weekly</MenuItem>
                            <MenuItem value="MONTHLY">Monthly</MenuItem>
                        </Select>
                    </FormControl>
                    <FormGroup>
                        {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map(day => (
                            <FormControlLabel
                                control={
                                    <Checkbox

                                    />
                                }
                                label={day}
                                key={day}
                            />
                        ))}
                    </FormGroup>
                    <FormControl fullWidth margin="normal">
                        <DateTimePicker
                            label="Start Time"
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <DateTimePicker
                            label="End Time"
                        />
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Set Recurring Slots
                    </Button>
                </form>
            </div>
        </Box>
    );
};

export default BookSlotComponent;
