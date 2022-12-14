import { useEffect, useState } from "react";

// Custom hooks
import useForm from "../hooks/useForm";
import { useEntries, useModals } from "../hooks/useStore";

// Components
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Form from "./Form";

const initialFormValues = {
  name: "",
  email: "",
  gender: "male",
  city: "",
  street: "",
  phone: "",
};

const EditEntryModal = () => {
  const { isEditModal, setIsEditModal } = useModals();
  const { entries, editEntry, currentEntryId } = useEntries();
  const { form, setForm, handleChange: handleFormChange } = useForm(initialFormValues);

  const currentEntry = entries.filter((entry) => entry.id === currentEntryId)[0];

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
        <Form
          buttonText="Edit Entry"
          state={{ form, setForm, handleFormChange }}
          onSubmit={handleEditEntry}
        />
      </ModalBody>
    </Modal>
  );
};

export default EditEntryModal;
