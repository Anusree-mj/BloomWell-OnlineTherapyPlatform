import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getDashboardDetailsAction, adminActivitiesStateType } from '@/store/admin/adminActivityReducer';
import { Box } from '@mui/system';
import BarChartComponent from '@/components/common/chart/barChart';

const DashBoardComponent = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDashboardDetailsAction());
    }, []);

   
    return (
        <Box sx={{
            ml: { xs: 'none', sm: '15rem' }, mt: { sm: 3 }
        }}>
            <BarChartComponent />
        </Box>
    )
}

export default DashBoardComponent
