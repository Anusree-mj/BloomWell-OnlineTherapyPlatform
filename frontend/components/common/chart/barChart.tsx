import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/system';

export default function BasicBars({ xData, yData }: any) {
  const labelItems = [
    { color: '#02B2AF', name: 'TotalClients' },
    { color: '#72CCFF', name: 'TotalSubscribedClients' },
    { color: '#DA00FF', name: 'TotalTherapists' },
    { color: '#9001CB', name: 'TotalActiveTherapists' },
  ]
  return (
    <Box
      sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
      }}>

      <Box sx={{  }}>

        <BarChart
          xAxis={[{ scaleType: 'band', data: xData }]}
          series={yData}
          width={500}
          height={300}
        />
      </Box>
      <Box
        sx={{ display: 'flex', gap: 2, maxWidth: '90%', width: '30rem' }}>

        {labelItems.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: item.color, maxWidth: '90%' }}></div>
            <span style={{fontSize:'0.9rem',marginLeft:2}}>{item.name}</span>
          </div>
        ))}
      </Box>
    </Box>
  );
}