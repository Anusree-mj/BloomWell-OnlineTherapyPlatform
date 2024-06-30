import { useEffect, useState } from "react";
import { DateCalendar, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/system";
import { Button, Divider, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
    getAvailableSlotsAction, clientMyActivityStateType,
    getBookedSlotsDetailsAction
} from "@/store/clients/clientMyActionReducer";
import axios from "axios";
import CancelComponent from "./cancelComponent";
import { clientStateType } from "@/store/clients/clientReducer";

const BookSlotComponent = () => {
    const [date, setDate] = useState<Dayjs | null>(null);
    const [time, setTime] = useState<Dayjs | null>(null);
    const [availableDates, setAvailableDates] = useState<Dayjs[]>([]);
    const [isActiveSlot, setIsActiveSlot] = useState(false);

    const dispatch = useDispatch();
    const slots = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.slots);
    const availableFrom = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.availableFrom);
    const availableTo = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.availableTo);
    const clientDetails = useSelector((state: { client: clientStateType }) => state.client.client);

    useEffect(() => {
        const clientData = localStorage.getItem('clientData');
        if (clientData) {
            if (clientDetails.isActiveSlots) {
                setIsActiveSlot(true);
            } else {
                dispatch(getAvailableSlotsAction(clientDetails.therapistDetails?clientDetails.therapistDetails._id:''));
            }
        }
    }, [clientDetails]);
    useEffect(() => {
        if (slots && slots.length > 0) {
            const filteredSlots = slots
                .map(slot => dayjs(slot))
                .filter(slot => slot.isAfter(dayjs()) && slot.isBefore(dayjs().add(2, 'month')));

            setAvailableDates(filteredSlots);
        }
    }, [slots]);

    const handleCheckAvailability = async () => {
        try {
            const valid = checkValidity();
            if (!valid) {
                return;
            } else {
                const formattedDate = date?.format('DD-MM-YY');
                const formattedTime = time?.format('hh:mm A');
                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/client/slots/${clientDetails.therapistDetails._id}`,
                    { date: formattedDate, time: formattedTime },
                    { withCredentials: true, }
                );
                if (response.status === 200) {
                    const { addedSlotId } = response.data
                    dispatch(getBookedSlotsDetailsAction(addedSlotId))
                    setIsActiveSlot(true)
                }
            }
        } catch (err) {
            console.log('Error found', err)
        }
    };

    const checkValidity = () => {
        let isValid = true;
        console.log('entered in validity')
        if (!date) {
            isValid = false;
            toast.error('Select a date')
        }
        if (!time) {
            isValid = false;
            toast.error('Select time')
        }
        return isValid;
    };

    const shouldDisableDate = (date: Dayjs) => {
        if (date.isBefore(dayjs(), 'day')) {
            return true;
        }
        return !availableDates.some(availableDate => availableDate.isSame(date, 'day'));
    };

    const minTime = dayjs(availableFrom).minute(0);
    const maxTime = dayjs(availableTo).minute(0);

    return (
        <Box sx={{
            display: 'flex', backgroundColor: '#F7FCC2',
            flexDirection: 'column', minHeight: '80vh',
            alignItems: 'center', justifyContent: 'center', pb: 8,
        }}>
            {!isActiveSlot ? (
                <>
                    <Typography
                        sx={{
                            mt: 2, mb: 2, color: '#325343',
                            fontSize: '1.2rem', fontWeight: 800,
                        }}>
                        Book a slot for your next session
                    </Typography>
                    <Box sx={{
                        display: 'flex', flexDirection: 'column', maxWidth: '90%',
                        width: '50rem', borderRadius: '1rem', p: "2rem 1rem 1.5rem 1rem",
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
                        alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',
                    }}>
                        <Typography
                            sx={{
                                mb: 1, color: '#325343', alignSelf: 'start',
                                fontSize: '1rem', fontWeight: 600,
                            }}>
                            Choose your preferred session time from the therapist's available schedules for the next two months.
                        </Typography>
                        <Divider sx={{ width: '100%', mb: 2 }} />
                        <Box sx={{
                            display: 'flex', flexWrap: 'wrap', alignItems: { xs: 'center', md: 'flex-start' },
                            justifyContent: { xs: 'center', md: 'flex-start' }, gap: '2rem',
                        }}>
                            <Box sx={{
                                display: 'flex', flexDirection: 'column',
                                width: { xs: '100%', md: '25rem' }, maxWidth: '100%',
                            }}>
                                <Typography
                                    sx={{
                                        color: '#325343',
                                        fontSize: '1rem', textDecoration: 'underline'
                                    }}>
                                    Select a date
                                </Typography>
                                <DateCalendar
                                    disablePast
                                    shouldDisableDate={shouldDisableDate}
                                    sx={{ color: '#325343', width: '100%' }}
                                    value={date}
                                    onChange={(newDate) => setDate(dayjs(newDate))}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex', flexDirection: 'column',
                                width: { xs: '100%', md: '20rem' }, maxWidth: '100%',
                            }}>
                                <Typography
                                    sx={{
                                        color: '#325343', mb: 1,
                                        fontSize: '1rem', textDecoration: 'underline'
                                    }}>
                                    Select a time
                                </Typography>
                                <TimePicker
                                    views={['hours', 'minutes']}
                                    value={time}
                                    onChange={(newTime) => setTime(dayjs(newTime))}
                                    minTime={minTime}
                                    maxTime={maxTime}

                                />
                            </Box>
                        </Box>
                        <Button
                            onClick={handleCheckAvailability}
                            sx={{
                                mt: 1, color: 'white', backgroundColor: '#325343',
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
                </>
            ) :
                <CancelComponent setIsActiveSlot={setIsActiveSlot} />
            }
        </Box>
    );
};

export default BookSlotComponent;
