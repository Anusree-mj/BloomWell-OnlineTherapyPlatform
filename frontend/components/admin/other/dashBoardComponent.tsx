import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getDashboardDetailsAction, adminActivitiesStateType } from '@/store/admin/adminActivityReducer';
import { Box } from '@mui/system';
import BarChartComponent from '@/components/common/chart/barChart';
import { Typography } from '@mui/material';

interface MonthData {
  count: number;
  month: number;
}

interface Response {
  totalClients: MonthData[];
  totalSubscribedClients: MonthData[];
  totalTherapists: MonthData[];
  totalActiveTherapists: MonthData[];
}
const getDataForChart = (response: object) => {
  const months = Array.from(new Set(
    Object.values(response)
      .flatMap(item => item.map((data: { month: number, count: number }) => data.month))
  ));

  months.sort((a, b) => a - b);

  const yData: { data: number[]; color: string }[] = [];

  const colors = ['#02B2AF', '#72CCFF', '#DA00FF', '#9001CB'];
  const dataKey = ['TotalClients', 'TotalSubscribedClients', 'TotalTherapists', 'TotalActiveTherapists'];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (const [index, key] of Object.keys(response).entries()) {
    if (response.hasOwnProperty(key)) {
      const categoryData: number[] = [];

      months.forEach(month => {
        const count = response[key as keyof Response]
          .find(item => item.month === month)?.count ?? 0;

        categoryData.push(count);
      });

      yData.push({ data: categoryData, color: colors[index] });
    }
  }

  const xData = months.map(month => monthNames[month - 1]); // Adjust month index

  return { xData, yData };
};



const DashBoardComponent = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: { adminActivities: adminActivitiesStateType }) => state.adminActivities.dashboardDetails)
  console.log(data, "ppp");


  const { xData, yData } = getDataForChart(data);



  useEffect(() => {
    console.log('entered in dashboard useffect')
    dispatch(getDashboardDetailsAction());
  }, []);


  return (
    <Box sx={{
      ml: { xs: 'none', sm: '15rem' }, mt: { sm: 3 }
    }}>
      <Typography variant="h6" noWrap component="div" sx={{
        color: '#325343', mt: '5rem', ml: 2,
        fontWeight: 800
      }}>
        Dashboard
      </Typography>
      <BarChartComponent xData={xData} yData={yData} />
    </Box>
  )
}

export default DashBoardComponent
