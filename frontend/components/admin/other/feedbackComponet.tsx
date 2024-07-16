'use-client'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GridColDef } from '@mui/x-data-grid';
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import TableComponent from "@/components/common/tableComponent";
import { getAllFeedbacksAction, adminActivitiesStateType } from "@/store/admin/adminActivityReducer";

const AdminFeedBackComponent = () => {
    const dispatch = useDispatch();
    const feedbacks = useSelector((state: { adminActivities: adminActivitiesStateType }) => state.adminActivities.feedbacks);
    const router = useRouter()

    useEffect(() => {
        dispatch(getAllFeedbacksAction());
    }, []);

    const columns: GridColDef[] = [
        { field: "slNo", headerName: "Sl.No", width: 70 },
        { field: "name", headerName: "Name", width: 130 },
        { field: "role", headerName: "Role", width: 150 },
        { field: "feedback", headerName: "Feedback", width: 350 },
    ];
    const rows = feedbacks.map((feedback, index) => ({
        id: feedback._id,
        slNo: index + 1,
        name: feedback.userName,
        role: feedback.userType,
        feedback: feedback.feedback
    }));
    const head = 'Manage Clients ';

    return (
        <Box sx={{
            ml: { xs: 'none', sm: '15rem' }, mt: 5
        }}>
            <TableComponent rows={rows} columns={columns} head={head} subHead={[]} role="admin" />
        </Box>
    );
}
export default AdminFeedBackComponent