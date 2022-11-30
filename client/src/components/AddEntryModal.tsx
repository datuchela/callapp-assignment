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

const AddEntryModal = () => {
  const { form, setForm, handleChange: handleFormChange } = useForm(initialFormValues);

  const { isAddModal, setIsAddModal } = useModals();
  const { addEntry } = useEntries();

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
    setForm(initialFormValues);
  }

  return (
    <Modal centered size="md" isOpen={isAddModal} toggle={() => setIsAddModal(false)}>
      <ModalHeader>Add Entry</ModalHeader>
      <ModalBody>
        <Form
          buttonText="Add Entry"
          state={{ form, setForm, handleFormChange }}
          onSubmit={handleAddEntry}
        />
      </ModalBody>
    </Modal>
  );
};

export default AddEntryModal;
