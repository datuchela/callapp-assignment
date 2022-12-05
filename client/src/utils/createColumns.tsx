import { TableColumn } from "react-data-table-component";
import { Button } from "antd";

export const createColumns = (
  deleteEntry: (id: number) => void,
  referenceEntry: Entry
): TableColumn<Entry>[] => {
  if (!referenceEntry) return [];
  const arrayOfKeys = Object.keys(referenceEntry);
  const dynamicColumns = arrayOfKeys.map((key: string) => ({
    name: key,
    selector: (row: Entry) => {
      if (key === "address") {
        return row.address.city + ", " + row.address.street;
      }
      return row[key];
    },
  }));

  return [
    // {
    //   name: "id",
    //   selector: (row) => row.id,
    // },
    // {
    //   name: "name",
    //   selector: (row) => row.name,
    // },
    // {
    //   name: "email",
    //   selector: (row) => row.email,
    // },
    // {
    //   name: "gender",
    //   selector: (row) => row.gender,
    // },
    // {
    //   name: "address",
    //   selector: (row) => `${row.address.city}, ${row.address.street}`,
    // },
    // {
    //   name: "phone",
    //   selector: (row) => row.phone,
    // },
    ...dynamicColumns,
    {
      button: true,
      cell: (row) => (
        <Button danger onClick={() => deleteEntry(row.id)}>
          Delete
        </Button>
      ),
    },
  ];
};
