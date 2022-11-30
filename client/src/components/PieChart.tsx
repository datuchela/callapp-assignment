import styled from "styled-components";

// Custom hooks
import { useEntries } from "../hooks/useStore";

// Utils
import { createPieChart } from "../utils/createPieChart";

// Components
import Chart from "react-apexcharts";

const ChartWrapperDiv = styled.div`
  margin: 0 0 3rem 0;
  width: 400px;
`;

const PieChart = () => {
  const { entries } = useEntries();
  const { options, series } = createPieChart(entries);

  return (
    <>
      <ChartWrapperDiv>
        <h2>Chart</h2>
        <Chart options={options} series={series} type="pie" />
      </ChartWrapperDiv>
    </>
  );
};

export default PieChart;
