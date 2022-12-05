import styled from "styled-components";

// Custom hooks
import { useEntries, useModals } from "../hooks/useStore";
import useFetchEntries from "../hooks/useFetchEntries";

// Utils
import { createColumns } from "../utils/createColumns";

// Components
import DataTable from "react-data-table-component";
import { Button } from "antd";
import AddEntryModal from "./AddEntryModal";
import EditEntryModal from "./EditEntryModal";

const TableWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
`;

const EntriesTable = () => {
  const { setIsAddModal, setIsEditModal } = useModals();
  const { deleteEntry, setCurrentEntryId } = useEntries();
  const entries = useFetchEntries();

  const columns = createColumns(deleteEntry, entries[0]);

  return (
    <>
      <AddEntryModal />
      <EditEntryModal />
      <TableWrapperDiv>
        <Button type="primary" onClick={() => setIsAddModal(true)}>
          Add Entry
        </Button>
        <DataTable
          onRowDoubleClicked={(row) => {
            setCurrentEntryId(row.id);
            setIsEditModal(true);
          }}
          columns={columns}
          data={entries}
          defaultSortFieldId={"id"}
          pointerOnHover
          highlightOnHover
        />
      </TableWrapperDiv>
    </>
  );
};

export default EntriesTable;
