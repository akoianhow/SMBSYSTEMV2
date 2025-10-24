import { Box, Button, Paper, Typography, MenuItem } from "@mui/material";
import { useEffect } from "react";
import { useProducts } from "../../../lib/hooks/useProducts";
import { Link, useNavigate, useParams } from "react-router";
import { useCategories } from "../../../lib/hooks/useCategories";
import { useSuppliers } from "../../../lib/hooks/useSuppliers";
import { useForm, type FieldValues } from 'react-hook-form';
import { ProductSchema } from '../../../lib/schemas/productSchema';
import { zodResolver } from '../../../../node_modules/@hookform/resolvers/zod/src/zod';
import TextInput from "../../../app/shared/components/TextInput";
import type { ProductDTO } from "../../../lib/types";


export default function ProductForm() {

  const {control, reset, handleSubmit} = useForm<ProductSchema>({
    mode:'onTouched',
    resolver: zodResolver(ProductSchema)
  });
  const {categories, isPending} = useCategories();
  const {suppliers} = useSuppliers();
  const {id} = useParams();
  const {selectedProduct , updateProduct, createProduct, isLoading } = useProducts(Number(id));
  
  const navigate = useNavigate()

  const onSubmit = async (data: FieldValues) => {
    if(selectedProduct) {
        updateProduct.mutate({...selectedProduct, ...data} as ProductDTO, 
          {onSuccess: ()=> {navigate(`/products/${selectedProduct.id}`)}}
        );
    }
    else {
      const newProduct = {...data}
      console.log(newProduct);
      createProduct.mutate(newProduct as ProductDTO, {
        onSuccess: ()=> navigate(`/products`)
      });
    }
  };
  useEffect(()=> {
    if(selectedProduct) reset(selectedProduct)
  }, [selectedProduct, reset])

  if(isLoading) return <Typography>Loading...</Typography>
  if(!categories && !!isPending) return <Typography>Loading..</Typography>;
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3}>

        <TextInput name='name' label="Name" control={control} value={selectedProduct?.name} />
        <TextInput name='description' label="Description" control={control} value={selectedProduct?.description}/>
        <TextInput name='cost' type='number'  control={control} label="Cost" value={selectedProduct?.cost} />

        <TextInput name='srp' type='number'  control={control} label="Srp" value={selectedProduct?.srp} />
        <TextInput name='itemsInStock' type='number' control={control}  label="Items in Stock" value={selectedProduct?.itemsInStock}/>
        <TextInput name='categoryId' control={control} select label="Category" defaultValue={selectedProduct?.categoryId ?? 1} >
          {categories?.map(category => (
            <MenuItem key={category.id} value={category.id}>
                {category.name}
            </MenuItem>
          ))}
        </TextInput>
        <TextInput name='supplierId' control={control} select label="Supplier" defaultValue={selectedProduct?.supplierId ?? 1}>
          {suppliers?.map(supplier => (
            <MenuItem key = {supplier.id} value={supplier.id} >
              {supplier.name}
            </MenuItem>
          ))}
        </TextInput>
        <Box display="flex" justifyContent="end" gap={3}>
          <Button  component={Link} to='/products' color="inherit">Cancel</Button>
          <Button type="submit" color="success" variant="contained" disabled={updateProduct.isPending}>
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
