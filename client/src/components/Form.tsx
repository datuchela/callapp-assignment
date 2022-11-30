import styled from "styled-components";

// Custom hooks
import useForm from "../hooks/useForm";

// Components
import { Input, Select, Button } from "antd";

// Styled Components
const FormContainer = styled.form`
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

type FormProps = {
  buttonText: string;
  state: {
    form: any;
    setForm: React.Dispatch<any>;
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form: React.FC<FormProps> = ({ buttonText, state, onSubmit }) => {
  const { form, setForm, handleFormChange } = state;

  return (
    <FormContainer onSubmit={onSubmit}>
      <FormDiv>
        <Input
          style={{ flex: "1" }}
          id="name"
          name="name"
          value={form.name}
          onChange={handleFormChange}
          addonBefore={<label htmlFor="name">name</label>}
        />
        <Input
          style={{ flex: "1" }}
          id="email"
          name="email"
          value={form.email}
          onChange={handleFormChange}
          addonBefore={<label htmlFor="email">email</label>}
        />
      </FormDiv>
      <FormDiv>
        <Select
          style={{ flex: "1" }}
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
          style={{ flex: "1" }}
          id="city"
          name="city"
          value={form.city}
          onChange={handleFormChange}
          addonBefore={<label htmlFor="city">city</label>}
        />
      </FormDiv>
      <FormDiv>
        <Input
          style={{ flex: "1" }}
          id="street"
          name="street"
          value={form.street}
          onChange={handleFormChange}
          addonBefore={<label htmlFor="street">street</label>}
        />
        <Input
          style={{ flex: "1" }}
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleFormChange}
          addonBefore={<label htmlFor="phone">phone</label>}
        />
      </FormDiv>
      <Button htmlType="submit" style={{ width: "100%" }} size="large" type="primary">
        {buttonText}
      </Button>
    </FormContainer>
  );
};

export default Form;
