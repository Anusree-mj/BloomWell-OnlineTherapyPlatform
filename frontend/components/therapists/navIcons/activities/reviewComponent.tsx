'use-client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GridColDef } from '@mui/x-data-grid';
import FormHelperText from '@mui/material/FormHelperText';
import { useRouter } from "next/navigation";
import { Box, Modal, Rating, Typography } from "@mui/material";
import Link from "next/link";
import { getTherapistsReviewsAction, ActivitiesStateType } from "@/store/therapists/therapistActvitiesHandlerReducers";
import TableComponent from "@/components/common/tableComponent";

const TherapistReviewsComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const reviews = useSelector((state: {
        therapistActivities: ActivitiesStateType
    }) => state.therapistActivities.reviews);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [cellValue, setCellValue] = useState<string>('');


    useEffect(() => {
        const therapistData = localStorage.getItem("therapistData");
        if (therapistData) {
            dispatch(getTherapistsReviewsAction());
        } else {
            router.push('/login')
        }
    }, []);
    const handleOpen = (value: string) => {
        setCellValue(value);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const columns: GridColDef[] = [
        { field: "no", headerName: "No", width: 10 },
        { field: "name", headerName: "Name", width: 120 },
        {
            field: "therapy",
            headerName: "View Profile",
            sortable: false,
            width: 120,
            renderCell: (params) => (
                <Link href={`/client/medicalInfo/${params.row.clientId}`} style={{ textDecoration: 'underline' }}
                >View
                </Link>
            ),
        },
        {
            field: "rating", headerName: "Ratings", width: 180,
            renderCell: (params) => (
                <Rating name="read-only" sx={{ mt: 1 }} value={params.row.rating} readOnly />
            ),
        },
        {
            field: "review",
            headerName: "Reviews",
            width: 500,
            renderCell: (params) => (
                <Link href={'#'}
                    onClick={() => handleOpen(params.value)}
                >
                    {params.value}
                </Link>
            ),
        },
    ];
    const rows = reviews.map((review, index) => ({
        id: review._id,
        clientId: review.clientId._id,
        no: index + 1,
        name: review.clientId.name,
        rating: review.rating,
        review: review.comments,
        therapy: 'View Profile',
    }));
    const head = 'View Reviews';
    const subHead = [
        { name: 'Active', url: 'therapist/activities/active', select: false },
        { name: 'Inactive', url: 'therapist/activities/inActive', select: false },
        { name: 'Reviews', url: 'therapist/activities/reviews', select: true }

    ]
    return (
        <Box sx={{
            backgroundColor: '#F7FCC2', pb: 8
        }}>
            <TableComponent rows={rows} columns={columns} head={head} subHead={subHead} role=""/>
            <Modal open={modalOpen} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 400, bgcolor: 'background.paper', border: '2px solid #325343', boxShadow: 24, p: 4
                }}>
                    <Typography variant="h6" noWrap component="div" sx={{
                        color: '#325343', alignSelf: 'start',
                        fontWeight: 800
                    }}>
                        Full Review
                    </Typography>
                    <Typography sx={{ mt: 2, color: '#325343', }}>
                        {cellValue}
                    </Typography>
                </Box>
            </Modal>

        </Box>
    );
}
export default TherapistReviewsComponent