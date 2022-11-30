import { useState } from "react";

function useForm<FormSchema>(initialValues: FormSchema) {
  const [form, setForm] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return { form, setForm, handleChange };
}

export default useForm;
