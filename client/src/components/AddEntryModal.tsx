import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import styled from "styled-components";
import { useEntries, useModals } from "../hooks/useStore";

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

const AddEntryModal = () => {
  const { isAddModal, setIsAddModal } = useModals();
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "male",
    city: "",
    street: "",
    phone: "",
  });

  const { addEntry } = useEntries();

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
    setIsAddModal(false);
  }

  return (
    <Modal centered size="md" isOpen={isAddModal} toggle={() => setIsAddModal(false)}>
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
  );
};

export default AddEntryModal;
