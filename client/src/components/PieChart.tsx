import Chart from "react-apexcharts";
import styled from "styled-components";
import { useEntries } from "../hooks/useStore";
import { createPieChart } from "../utils/createPieChart";

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
        <Chart options={options} series={series} type="pie" />
      </ChartWrapperDiv>
    </>
  );
};

export default PieChart;
