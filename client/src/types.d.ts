type EntryWithoutId = {
  name: string;
  email: string;
  gender: string; // could use "male" | "female" as a type but this could be done with validators as well in the future.
  address: {
    street: string;
    city: string;
  };
  phone: string;
};

type Entry = EntryWithoutId & {
  id: number;
};
