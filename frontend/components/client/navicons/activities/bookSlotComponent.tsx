import { useEffect, useState } from "react";
import { DateCalendar, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/system";
import { Button, Divider, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
    getAvailableSlotsAction, clientMyActivityStateType,
} from "@/store/clients/clientMyActionReducer";
import CancelComponent from "./cancelComponent";
import { clientStateType } from "@/store/clients/clientReducer";
import { apiCall } from "@/services/api";
import { useRouter } from "next/navigation";

const BookSlotComponent = () => {
    const [date, setDate] = useState<Dayjs | null>(null);
    const [time, setTime] = useState<Dayjs | null>(null);
    const [availableDates, setAvailableDates] = useState<Dayjs[]>([]);
    const [isActiveSlot, setIsActiveSlot] = useState(false);
    const [activeSlotId, setActiveSlotId] = useState('')
    const dispatch = useDispatch();
    const router = useRouter()
    const slots = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.slots);
    const availableFrom = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.availableFrom);
    const availableTo = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.availableTo);
    const clientDetails = useSelector((state: { client: clientStateType }) => state.client.client);
    const bookedSlot = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.bookedSlot)

    useEffect(() => {
        if (clientDetails && !clientDetails.isConnected) {
            toast.error(`You don't have an active connection yet!`)
            router.push('/client/connection')
        }
    }, [])

    useEffect(() => {
        if (clientDetails._id !== '') {
            console.log('clientdetails gotttttttttttttttttt', clientDetails)
            if (clientDetails.isActiveSlots) {
                setIsActiveSlot(true);
                setActiveSlotId(clientDetails.activeSlotId)
            } else {
                console.log('therapist iddddddd', clientDetails.therapistDetails._id)

                dispatch(getAvailableSlotsAction(clientDetails.therapistDetails ? clientDetails.therapistDetails._id : ''));
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
                console.log('therapist iddddddd', clientDetails.therapistDetails._id)
                const response = await apiCall({
                    method: 'POST',
                    endpoint: `client/slots/${clientDetails.therapistDetails._id}`,
                    body: { date: formattedDate, time: formattedTime }
                });
                if (response.status === 'ok') {
                    const { addedSlotId } = response
                    setActiveSlotId(addedSlotId)
                    setIsActiveSlot(true)
                }
            }
        } catch (err) {
            console.log('Error found', err)
        }
    };

    const checkValidity = () => {
        let isValid = true;
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
            display: 'flex', backgroundColor: '#325343',
            flexDirection: 'column', minHeight: '100vh',
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
                            Choose your preferred session time from the therapists available schedules for the next two months.
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
                <CancelComponent setIsActiveSlot={setIsActiveSlot} addedSlotId={activeSlotId} />
            }
        </Box>
    );
};

export default BookSlotComponent;
