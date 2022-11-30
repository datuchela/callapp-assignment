type Entry = {
  id: number;
  name: string;
  email: string;
  gender: "male" | "female";
  address: {
    street: string;
    city: string;
  };
  phone: string;
};
