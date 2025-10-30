import { Box, Button, Paper, Typography } from '@mui/material'
import { useEffect } from 'react'
import TextInput from '../../../app/shared/components/TextInput'
import { useForm, type FieldValues } from 'react-hook-form'
import { useCategories } from '../../../lib/hooks/useCategories'
import { CategorySchema } from '../../../lib/schemas/categorySchema'
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js'
import type { Category } from '../../../lib/types'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router';

export default function CategoryForm() {


const navigate = useNavigate();
const {id} = useParams();
const {selectedCategory, isLoading, updateCategory, createCategory} = useCategories(Number(id));
const { control, reset, handleSubmit } = useForm<CategorySchema>({
    mode: 'onTouched',
    resolver: zodResolver(CategorySchema)
});

const onSubmit = async (data: FieldValues) => {
    if(selectedCategory) {
        updateCategory.mutate({...selectedCategory, ...data} as Category,
            {onSuccess: () => {
                navigate('/categories')
            }}
        )
    }
    else {
        const newCategory =  {...data};
        createCategory.mutate(newCategory as Category ,
             {onSuccess: async() => {
                navigate('/categories')
             }})
    }
}
useEffect(() => {

    if(selectedCategory) {
        reset(selectedCategory)
    }
}, [selectedCategory, reset])

  return (
     <Paper sx={{borderRadius: 3, padding: 3}}>
      <Typography variant="h5" gutterBottom>
        Create Category
      </Typography>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' 
          flexDirection='column' gap={3}>
          <TextInput name='name' label="Name"  control={control} value={selectedCategory?.name}/>
          <TextInput name='description' label="Description"  control={control} value={selectedCategory?.description}/>
          
           <Box display="flex" justifyContent="end" gap={3}>
              <Button component={Link} to='/categories' color='inherit'>Cancel</Button>
              <Button type="submit" color="success" variant="contained" disabled={isLoading}>
                Submit
              </Button>
           </Box>

      </Box>
      </Paper>
  )
}
