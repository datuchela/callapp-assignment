import styled from "styled-components";
import PieChart from "./components/PieChart";
import EntriesTable from "./components/EntriesTable";

const Main = styled.main`
  padding: 2rem;
`;

const Div = styled.div``;

function App() {
  return (
    <Main>
      <Div>
        <PieChart />
        <EntriesTable />
      </Div>
    </Main>
  );
}

export default App;
