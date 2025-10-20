import { Box, Button, Paper } from '@mui/material'
import { Typography } from '@mui/material';
import type { ProductDTO } from '../../../lib/types';
import { Link } from 'react-router';


type Props = {
    selectedProduct: ProductDTO
}
export default function ProductDetailsInfo({selectedProduct} :Props) {
  return (
    <Paper elevation={3}>

        <div>ProductDetailsInfo</div>
        <Typography variant='h5'>{selectedProduct.categoryName}</Typography>
        <Box display='flex' justifyContent='flex-end'>
            <Button>MANAGE</Button>
            <Button component={Link} to={`/editProduct/${selectedProduct.id}`}>EDIT</Button>
        </Box>
    </Paper>
  )
}
