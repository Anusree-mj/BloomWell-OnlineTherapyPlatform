import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { TherapyCountItems } from '@/store/admin/type';
import { Box, style, width } from '@mui/system';
import { Typography } from '@mui/material';

interface PieChartComponentProps {
    pieChartData: TherapyCountItems[]
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ pieChartData }) => {

    if (!pieChartData || pieChartData.length < 3) {
        return <></>; // or handle this case appropriately
    }
    const data = [
        { id: 0, value: pieChartData[0].totalCount, label: pieChartData[0]._id },
        { id: 1, value: pieChartData[1].totalCount, label: pieChartData[1]._id },
        { id: 2, value: pieChartData[2].totalCount, label: pieChartData[2]._id },
    ]

    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
            width: '30rem', maxWidth: '90%',
        }}>
            <Typography sx={{
                color: '#325343', mt: 1, ml: 2, mb: 3,
                fontWeight: 600, alignSelf: 'flex-start'
            }}>
                BloomWell Sessions Breakdown
            </Typography>
            <PieChart
                series={[
                    {
                        data,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    }
                ]} sx={{
                    display: 'flex', justifyContent: 'space-between', alignContent: 'space-between',
                }}
                width={300}
                height={200}
            />
        </Box>
    );
}

export default PieChartComponent;
