import { TableColumn } from "react-data-table-component";

export const createColumns = (deleteEntry: (id: number) => void): TableColumn<Entry>[] => {
  return [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Address",
      selector: (row) => `${row.address.city}, ${row.address.street}`,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      button: true,
      cell: (row) => <button onClick={() => deleteEntry(row.id)}>delete</button>,
    },
  ];
};
