import { useForm, type FieldValues } from "react-hook-form"
import { SupplierSchema } from "../../lib/schemas/productSchema"
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js"
import { Box, Button, Paper, Typography } from "@mui/material"
import TextInput from "../../app/shared/components/TextInput"
import { Link, useNavigate, useParams } from "react-router"
import { useSuppliers } from "../../lib/hooks/useSuppliers"
import { useEffect } from "react"
import type { Supplier } from "../../lib/types"

export default function SupplierForm() {
  
    const {id} = useParams();
  const {selectedSupplier, isLoading, updateSupplier, createSupplier} = useSuppliers(Number(id));
  const {control, reset, handleSubmit} = useForm<SupplierSchema>({
    mode: 'onTouched',
    resolver: zodResolver(SupplierSchema)
  })
  const navigate = useNavigate();

  const onSubmit = async( data: FieldValues) => {
    if(selectedSupplier) {  
        updateSupplier.mutate({...selectedSupplier, ...data} as Supplier,
          {onSuccess: ()=> {navigate(`/suppliers`)}}
        )
    }
    else {
      const newSupplier = {...data};
      createSupplier.mutate(newSupplier as Supplier, {
        onSuccess: ()=> navigate('/suppliers')
    })
  }}

  useEffect(()=> {
      console.log("supplname: " + selectedSupplier?.name);

    if(selectedSupplier) {
      console.log("supplname: " + selectedSupplier?.name);
      reset(selectedSupplier)}
  }, [selectedSupplier, reset])


  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
      <Typography variant="h5" gutterBottom>
        Create Supplier
      </Typography>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' 
          flexDirection='column' gap={3}>
          <TextInput name='name' label="Name"  control={control} value={selectedSupplier?.name}/>
          <TextInput name='description' label="Description"  control={control} value={selectedSupplier?.description}/>
          
           <Box display="flex" justifyContent="end" gap={3}>
              <Button  component={Link} to='/suppliers' color="inherit">Cancel</Button>
              <Button type="submit" color="success" variant="contained" disabled={isLoading}>
                Submit
              </Button>
           </Box>

      </Box>
    </Paper>
  )
}
