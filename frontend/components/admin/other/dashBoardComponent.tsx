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
  const months = Array.from(new Set(
    Object.values(response)
      .flatMap(item => item.map((data: { month: number, count: number }) => data.month))
  ));

  months.sort((a, b) => a - b);

  const yData: { data: number[]; color: string }[] = [];

  const colors = ['#02B2AF', '#72CCFF', '#DA00FF', '#9001CB'];
  const dataKey = ['TotalClients', 'TotalSubscribedClients', 'TotalTherapists', 'TotalActiveTherapists'];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const keys = Object.keys(response) as Array<keyof Response>;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (response.hasOwnProperty(key)) {
      const categoryData: number[] = [];

      months.forEach(month => {
        const count = response[key]
          .find(item => item.month === month)?.count ?? 0;

        categoryData.push(count);
      });

      yData.push({ data: categoryData, color: colors[i] });
    }
  }

  const xData = months.map(month => monthNames[month - 1]); // Adjust month index

  return { xData, yData };
};

const DashBoardComponent = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: { adminActivities: adminActivitiesStateType }) => state.adminActivities.dashboardDetails)
  const pieChartData = useSelector((state: { adminActivities: adminActivitiesStateType }) => state.adminActivities.therapyCount)
  const router = useRouter();

  const { xData, yData } = getDataForChart(data);

  useEffect(() => {
    console.log('entered in dashboard useffect')
    dispatch(getDashboardDetailsAction({ handleActionSuccess }));
  }, []);

  const handleActionSuccess = () => {
    dispatch(getTherapyCountsAction())
  }

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