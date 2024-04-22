import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import LineChart from "../../components/LineChart/LineChart";

const Line = () => {
  return (
    <Box m="20px" marginTop="-140px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;