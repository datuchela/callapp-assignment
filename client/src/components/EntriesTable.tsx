import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useEntries } from "../hooks/useStore";
import styled from "styled-components";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { createColumns } from "../utils/createColumns";
import useFetchEntries from "../hooks/useFetchEntries";

const Form = styled.form`
  display: flex;
  gap: 2rem;
`;

const FormInput = styled.div`
  display: flex;
  gap: 1rem;
`;

const EntriesTable = () => {
  const [isModal, setIsModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    address: {
      street: "",
      city: "",
    },
    phone: "",
  });
  const { deleteEntry } = useEntries();

  const entries = useFetchEntries();
  const columns = createColumns(deleteEntry);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Modal isOpen={isModal} toggle={() => setIsModal(false)}>
        <ModalHeader>Add Entry</ModalHeader>
        <ModalBody>
          <Form>
            <FormInput>
              <label htmlFor="name">name:</label>
              <input id="name" name="name" value={form.name} onChange={handleFormChange} />
            </FormInput>
            <FormInput>
              <label htmlFor="email">email:</label>
              <input id="email" name="email" value={form.email} onChange={handleFormChange} />
            </FormInput>
          </Form>
        </ModalBody>
      </Modal>
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "1rem",
        }}
      >
        <button onClick={() => setIsModal(true)}>add</button>
        <DataTable columns={columns} data={entries} selectableRows />
      </div>
    </>
  );
};

export default EntriesTable;
