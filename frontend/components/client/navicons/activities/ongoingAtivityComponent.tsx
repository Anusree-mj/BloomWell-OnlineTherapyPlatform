'use-client'
import { Box } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import DoSomethingComponent from "../../../common/doSomethingComponent";
import TableComponent from "@/components/common/tableComponent";

interface OngoingActivityProps {
  therapistDetails: any;
  ongoingActivity: any[];
}

const OngoingActivityComponent = ({ therapistDetails, ongoingActivity }: OngoingActivityProps) => {
  const columns: GridColDef[] = [
    { field: "slNo", headerName: "Sl.No", width: 70 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "startedAt", headerName: "Started At", width: 150 },
    { field: "endedAt", headerName: "Ended At", width: 150 },
    { field: "duration", headerName: "Duration", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
  ];

  const rows = ongoingActivity.map((item, index) => ({
    id: item._id,
    slNo: index + 1,
    date: item.date,
    startedAt: item.sessionStart ? item.sessionStart : '---',
    endedAt: item.sessionEnd ? item.sessionEnd : '---',
    duration: item.sessionDuration ? item.sessionDuration : '---',
    status: item.status
  }));

  let head;
  if (therapistDetails) {
    head = `Therapist : ${therapistDetails.name}`;
  }

  const subHead = [
    { name: 'Ongoing', url: 'client/myActivity/ongoing', select: true },
    { name: 'All', url: 'client/myActivity/all', select: false },
  ];

  return (
    <Box sx={{ backgroundColor: '#325343', pb: 8 }}>
      {therapistDetails && therapistDetails.name !== '' ? (
        <TableComponent rows={rows} columns={columns} head={head || ''} subHead={subHead} role='' />
      ) : (
        <Box sx={{
          display: 'flex', backgroundColor: '#325343',
          flexDirection: 'column', minHeight: '80vh',
          alignItems: 'center', justifyContent: 'center', pb: 8
        }}>
          <DoSomethingComponent
            content="You haven't connected to any therapist yet!" buttonTitle="Let's Connect"
            url="/client/connection" />
        </Box>
      )}
    </Box>
  );
};

export default OngoingActivityComponent;
