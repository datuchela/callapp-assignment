import { useState } from "react";
import DataTable from "react-data-table-component";
import { useEntries, useModals } from "../hooks/useStore";
import styled from "styled-components";
import { createColumns } from "../utils/createColumns";
import useFetchEntries from "../hooks/useFetchEntries";
import AddEntryModal from "./AddEntryModal";
import EditEntryModal from "./EditEntryModal";

const TableWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
`;

const EntriesTable = () => {
  const { isAddModal, setIsAddModal, setIsEditModal } = useModals();
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "male",
    city: "",
    street: "",
    phone: "",
  });

  const { deleteEntry, addEntry, currentEntryId, setCurrentEntryId } = useEntries();
  const entries = useFetchEntries();
  const columns = createColumns(deleteEntry);

  return (
    <>
      <AddEntryModal />
      <EditEntryModal />
      <TableWrapperDiv>
        <button onClick={() => setIsAddModal(true)}>add</button>
        <DataTable
          onRowDoubleClicked={(row) => {
            setCurrentEntryId(row.id);
            setIsEditModal(true);
          }}
          columns={columns}
          data={entries}
          defaultSortFieldId={"Id"}
        />
      </TableWrapperDiv>
    </>
  );
};

export default EntriesTable;
