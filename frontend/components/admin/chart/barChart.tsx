import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export default function BasicBars({ xData, yData }: any) {
  const labelItems = [
    { color: '#02B2AF', name: 'Clients' },
    { color: '#72CCFF', name: 'SubscribedClients' },
    { color: '#DA00FF', name: 'Therapists' },
    { color: '#9001CB', name: 'ActiveTherapists' },
  ]
  return (
    <Box
      sx={{width:'30rem',maxWidth:'90%',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
      }}>
      <Typography sx={{
        color: '#325343', mt: 1, ml: 2,
        fontWeight: 600, alignSelf: 'flex-start'
      }}>
        BloomWell Users Breakdown
      </Typography>
      <BarChart
        xAxis={[{ scaleType: 'band', data: xData }]}
        series={yData}
        width={400}
        height={250}
        sx={{ maxWidth: '90%' }}
      />
      <Box
        sx={{ display: 'flex', justifyContent:'space-between', maxWidth: '90%', width: '40rem', alignSelf: 'flex-start',
         }}>

        {labelItems.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center',maxWidth: '90%' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: item.color, maxWidth: '90%' }}></div>
            <span style={{ fontSize: '0.78rem', marginLeft: 2 }}>{item.name}</span>
          </div>
        ))}
      </Box>
    </Box>
  );
}