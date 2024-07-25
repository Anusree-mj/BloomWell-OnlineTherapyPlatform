import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getDashboardDetailsAction, getTherapyCountsAction, adminActivitiesStateType } from '@/store/admin/adminActivityReducer';
import { Box } from '@mui/system';
import BarChartComponent from '@/components/admin/chart/barChart';
import { Typography } from '@mui/material';
import PieChartComponent from '../chart/pieChart';
import TopTherapistsComponents from './topComponents';
import { adminAuth } from '@/utilities/auth';
import { useRouter } from 'next/navigation';

interface MonthData {
  count: number;
  month: string;
}

interface Response {
  totalClients: MonthData[];
  totalSubscribedClients: MonthData[];
  totalTherapists: MonthData[];
  totalActiveTherapists: MonthData[];
}
const getDataForChart = (response: Response) => {
  // Ensure response is not null and is an object
  if (!response || typeof response !== 'object') {
    return { xData: [], yData: [] };
  }

  // Extract months from response data and handle them as strings
  const months = Array.from(new Set(
    Object.values(response)
      .flatMap((item: MonthData[]) => 
        item.map(data => data.month).filter(month => month) // Filter out null or undefined months
      )
  ));

  // Sort months assuming they are strings like 'Jan', 'Feb', etc.
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  months.sort((a, b) => monthNames.indexOf(a) - monthNames.indexOf(b));

  const yData: { data: number[]; color: string }[] = [];
  const colors = ['#02B2AF', '#72CCFF', '#DA00FF', '#9001CB'];
  const dataKey = ['totalClients', 'totalSubscribedClients', 'totalTherapists', 'totalActiveTherapists'];

  const keys = Object.keys(response) as Array<keyof Response>;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const categoryData: number[] = [];

    const category = response[key] || [];

    monthNames.forEach(monthName => {
      const count = category.find(item => item.month === monthName)?.count ?? 0;
      categoryData.push(count);
    });

    yData.push({ data: categoryData, color: colors[i] });
  }

  // Safeguard against null/undefined values in yData
  yData.forEach(series => {
    series.data = series.data.map(value => value ?? 0); // Replace null/undefined with 0
  });

  // xData is just monthNames now
  const xData = monthNames; 

  return { xData, yData };
};





const DashBoardComponent = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: { adminActivities: adminActivitiesStateType }) => state.adminActivities.dashboardDetails) || {};
  const pieChartData = useSelector((state: { adminActivities: adminActivitiesStateType }) => state.adminActivities.therapyCount) || [];

  const router = useRouter();

  const { xData, yData } = getDataForChart(data);

  useEffect(() => {
    const { status } = adminAuth()
    if (status === 'ok') {
      dispatch(getDashboardDetailsAction());
      dispatch(getTherapyCountsAction())
    } else {
      router.push('/admin/login')
    }
  }, []);

  return (
    <Box sx={{
      pb: 4,
      ml: { xs: 'none', sm: '15rem' }, mt: { sm: 3 }
    }}>
      <Typography variant="h6" noWrap component="div" sx={{
        color: '#325343', mt: '5rem', ml: 2,
        fontWeight: 800
      }}>
        Dashboard
      </Typography>
      <TopTherapistsComponents />
      <Box sx={{
        display: 'flex', flexWrap: 'wrap',
        alignItems: { md: 'flex-start', xs: 'center' }, justifyContent: { md: 'space-between', xs: 'center' },
        p: '0 1.5rem'
      }}>
        <BarChartComponent xData={xData} yData={yData} />
        <PieChartComponent pieChartData={pieChartData} />
      </Box>
    </Box>
  )
}

export default DashBoardComponent
