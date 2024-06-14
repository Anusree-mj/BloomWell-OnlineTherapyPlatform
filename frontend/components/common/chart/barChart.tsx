import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useSelector } from "react-redux";
import { adminActivitiesStateType } from '@/store/admin/adminActivityReducer';
import { Box } from '@mui/system';


const BarChartComponent = () => {
    const dashboardDetails = useSelector((state: { adminActivities: adminActivitiesStateType }) => state.adminActivities.dashboardDetails);

    return (
        <Box sx={{mt:{md:'6rem',xs:'6rem'}}}>

            <BarChart
                series={[
                    { label: 'Total Clients', data: [dashboardDetails.totalClients] },
                    { label: 'Total Subscribed Clients', data: [dashboardDetails.totalSubscribedClients] },
                    { label: 'Total Therapists', data: [dashboardDetails.totalTherapists] },
                    { label: 'Total Active Therapists', data: [dashboardDetails.totalActiveTherapists] },
                ]}
                height={290}
                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
        </Box>
    );
}
export default BarChartComponent