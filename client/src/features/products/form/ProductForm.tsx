import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";

type Props = {
  handleFormClose: () => void;
  selectedProduct?: Product;
  handleSubmitForm: (product: Product) => void;
};

export default function ProductForm({
  handleFormClose,
  selectedProduct,
  handleSubmitForm,
}: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: { [key: any]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (selectedProduct) data.id = selectedProduct.id;
    handleSubmitForm(data as unknown as Product);
    console.log(data);
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField
          name="name"
          label="Name"
          defaultValue={selectedProduct?.name}
        />
        <TextField
          name="description"
          label="Description"
          defaultValue={selectedProduct?.description}
        />
        <TextField
          name="cost"
          type="number"
          label="Cost"
          defaultValue={selectedProduct?.cost}
        />
        <TextField label="Srp" defaultValue={selectedProduct?.srp} />
        <TextField
          name="itemsInStock"
          label="Items in Stock"
          defaultValue={selectedProduct?.itemsInStock}
        />
        <TextField
          name="category"
          label="Category"
          defaultValue={selectedProduct?.categoryName}
        />
        <TextField
          name="supplier"
          label="Supplier"
          defaultValue={selectedProduct?.supplierName}
        />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button onClick={handleFormClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" color="success" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
