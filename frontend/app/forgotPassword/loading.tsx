import Loader from "@/components/common/loader/loader";
import { Box } from "@mui/system";

export default function Loading() {
  return (
    <Box sx={{minHeight:'100vh', backgroundColor: '#325343', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader />
    </Box>
  );
}
