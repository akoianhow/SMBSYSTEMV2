import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useProducts } from "../../../lib/hooks/useProducts";
import { Link, useNavigate, useParams } from "react-router";

export default function ProductForm() {
  const {id} = useParams();
  const {selectedProduct , updateProduct, createProduct, isLoading } = useProducts(Number(id));
  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: { [key: any]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (selectedProduct) {
      data.id = selectedProduct.id;
      await updateProduct.mutateAsync(data as unknown as Product);
      navigate(`/products/${selectedProduct.id}`);
    } else {
       createProduct.mutate(data as unknown as Product, {
        onSuccess:(id) => {
          navigate(`/products/${id}`);
        }
       });
    }
  };

  if(isLoading) return <Typography>Loading...</Typography>

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit}
         display="flex" flexDirection="column" gap={3}>

        <TextField name="name" label="Name"
          defaultValue={selectedProduct?.name}
        />
        <TextField name="description" label="Description"
          defaultValue={selectedProduct?.description}
        />
        <TextField name="cost" type="number"
          label="Cost"
          defaultValue={selectedProduct?.cost}
        />
        <TextField label="Srp" defaultValue={selectedProduct?.srp} />
        <TextField name="itemsInStock" label="Items in Stock"
          defaultValue={selectedProduct?.itemsInStock}
        />
        <TextField name="categoryName" label="Category"
          defaultValue={selectedProduct?.categoryName}
        />
        <TextField name="supplierName"label="Supplier"
          defaultValue={selectedProduct?.supplierName}
        />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button  component={Link} to='/products' color="inherit">Cancel</Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateProduct.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
