import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useEntries } from "../hooks/useStore";
import styled from "styled-components";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { createColumns } from "../utils/createColumns";
import useFetchEntries from "../hooks/useFetchEntries";

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const FormDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FormButton = styled.button`
  margin-top: 1.25rem;
  width: 100%;
`;

const EntriesTable = () => {
  const [isModal, setIsModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "male",
    city: "",
    street: "",
    phone: "",
  });

  const { deleteEntry, addEntry } = useEntries();
  const entries = useFetchEntries();
  const columns = createColumns(deleteEntry);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAddEntry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const structuredForm: EntryWithoutId = {
      name: form.name,
      email: form.email,
      gender: form.gender,
      address: {
        city: form.city,
        street: form.street,
      },
      phone: form.phone,
    };
    addEntry(structuredForm);
    setIsModal(false);
  }

  return (
    <>
      <Modal centered size="md" isOpen={isModal} toggle={() => setIsModal(false)}>
        <ModalHeader>Add Entry</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAddEntry}>
            <FormDiv>
              <FormInputWrapper>
                <label htmlFor="name">name:</label>
                <input id="name" name="name" value={form.name} onChange={handleFormChange} />
              </FormInputWrapper>
              <FormInputWrapper>
                <label htmlFor="email">email:</label>
                <input id="email" name="email" value={form.email} onChange={handleFormChange} />
              </FormInputWrapper>
            </FormDiv>
            <FormDiv>
              <FormInputWrapper>
                <label htmlFor="gender">gender:</label>
                <select id="gender" name="gender" value={form.gender} onChange={handleFormChange}>
                  <option id="male" value="male">
                    Male
                  </option>
                  <option id="female" value="female">
                    Female
                  </option>
                </select>
              </FormInputWrapper>
              <FormInputWrapper>
                <label htmlFor="city">city:</label>
                <input id="city" name="city" value={form.city} onChange={handleFormChange} />
              </FormInputWrapper>
            </FormDiv>
            <FormDiv>
              <FormInputWrapper>
                <label htmlFor="street">street:</label>
                <input id="street" name="street" value={form.street} onChange={handleFormChange} />
              </FormInputWrapper>
              <FormInputWrapper>
                <label htmlFor="phone">phone:</label>
                <input id="phone" name="phone" value={form.phone} onChange={handleFormChange} />
              </FormInputWrapper>
            </FormDiv>
            <FormButton>Add Entry</FormButton>
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
