import styled from "styled-components";

// Custom hooks
import useForm from "../hooks/useForm";
import { useEntries, useModals } from "../hooks/useStore";

// Components
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Input, Select, Button } from "antd";

// Styled Components
const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const FormDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
`;
//

const AddEntryModal = () => {
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
    setForm({
      name: "",
      email: "",
      gender: "male",
      city: "",
      street: "",
      phone: "",
    });
  }

  return (
    <Modal centered size="md" isOpen={isAddModal} toggle={() => setIsAddModal(false)}>
      <ModalHeader>Add Entry</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleAddEntry}>
          <FormDiv>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              addonBefore={<label htmlFor="name">name</label>}
            />
            <Input
              id="email"
              name="email"
              value={form.email}
              onChange={handleFormChange}
              addonBefore={<label htmlFor="email">email</label>}
            />
          </FormDiv>
          <FormDiv>
            <label htmlFor="gender">gender:</label>
            <Select
              id="gender"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e })}
            >
              <Select.Option id="male" value="male">
                Male
              </Select.Option>
              <Select.Option id="female" value="female">
                Female
              </Select.Option>
            </Select>
            <Input
              id="city"
              name="city"
              value={form.city}
              onChange={handleFormChange}
              addonBefore={<label htmlFor="city">city</label>}
            />
          </FormDiv>
          <FormDiv>
            <Input
              id="street"
              name="street"
              value={form.street}
              onChange={handleFormChange}
              addonBefore={<label htmlFor="street">street</label>}
            />
            <Input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleFormChange}
              addonBefore={<label htmlFor="phone">phone</label>}
            />
          </FormDiv>
          <Button htmlType="submit" style={{ width: "100%" }} size="large" type="primary">
            Add Entry
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddEntryModal;
