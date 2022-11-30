import { useEffect, useState } from "react";
import styled from "styled-components";

// Custom hooks
import useForm from "../hooks/useForm";
import { useEntries, useModals } from "../hooks/useStore";

// Components
import { Modal, ModalBody, ModalHeader } from "reactstrap";

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

const EditEntryModal = () => {
  const { isEditModal, setIsEditModal } = useModals();
  const { entries, editEntry, currentEntryId } = useEntries();

  const [currentEntry, setCurrentEntry] = useState<Entry>(
    entries.filter((entry) => entry.id === currentEntryId)[0]
  );

  const {
    form,
    setForm,
    handleChange: handleFormChange,
  } = useForm({
    name: "",
    email: "",
    gender: "male",
    city: "",
    street: "",
    phone: "",
  });

  useEffect(() => {
    if (!currentEntryId) return;
    const entryFromArray = entries.filter((entry) => entry.id === currentEntryId)[0];
    setCurrentEntry(entryFromArray);
  }, [currentEntryId]);

  useEffect(() => {
    if (!currentEntryId) return;
    setForm({
      name: currentEntry.name,
      email: currentEntry.email,
      gender: currentEntry.gender,
      city: currentEntry.address.city,
      street: currentEntry.address.street,
      phone: currentEntry.phone,
    });
  }, [currentEntry]);

  function handleEditEntry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const structuredForm: Entry = {
      id: currentEntry.id,
      name: form.name,
      email: form.email,
      gender: form.gender,
      address: {
        city: form.city,
        street: form.street,
      },
      phone: form.phone,
    };
    editEntry(structuredForm);
    setIsEditModal(false);
  }

  return (
    <Modal centered size="md" isOpen={isEditModal} toggle={() => setIsEditModal(false)}>
      <ModalHeader>Edit Entry</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleEditEntry}>
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
          <FormButton>Edit Entry</FormButton>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditEntryModal;
