// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { useSelector } from "react-redux";
// import { adminActivitiesStateType } from '@/store/admin/adminActivityReducer';
// import { Box } from '@mui/system';
// import { axisClasses } from '@mui/x-charts/ChartsAxis';

// const chartSetting = {
//     yAxis: [
//         {
//             label: 'rainfall (mm)',
//         },
//     ],
//     width: 500,
//     height: 300,
//     sx: {
//         [`.${axisClasses.left} .${axisClasses.label}`]: {
//             transform: 'translate(-20px, 0)',
//         },
//     },
// };

// const valueFormatter = (value: number | null) => `${value}mm`;

// const BarChartComponent = () => {
//     const dashboardDetails = useSelector((state: { adminActivities: adminActivitiesStateType }) => state.adminActivities.dashboardDetails);
    
//     if (!dashboardDetails) {
//         // Handle the case where dashboardDetails is null or undefined
//         return null;
//     }

//     let dataset = {
//         data: dashboardDetails.flatMap(item => 
//             item.totalClients.map(clientItem => ({
//                 month: clientItem.month.toString(),
//                 totalClient: clientItem.totalClients,
//                 totalSubscribedClients: item.totalSubscribedClients.find(subscribedItem => subscribedItem.month === clientItem.month)?.totalSubscribedClients || 0,
//                 totalTherapists: item.totalTherapists.find(therapistItem => therapistItem.month === clientItem.month)?.totalClients || 0,
//                 totalActiveTherapists: item.totalActiveTherapists.find(activeTherapistItem => activeTherapistItem.month === clientItem.month)?.totalSubscribedClients || 0,
//             }))
//         ),
//     };
// const dummy=[{

// }]
//     return (
//         <BarChart
//             dataset={dataset?dataset:dummy}
//             xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
//             series={[
//                 { dataKey: 'totalClient', label: 'Total Clients', valueFormatter },
//                 { dataKey: 'totalSubscribedClients', label: 'Total Subscribed Clients', valueFormatter },
//                 { dataKey: 'totalTherapists', label: 'Total Therapists', valueFormatter },
//                 { dataKey: 'totalActiveTherapists', label: 'Total Active Therapists', valueFormatter },
//             ]}
//             {...chartSetting}
//         />
//     );
// }

// export default BarChartComponent;
