
import { useProducts } from '../../lib/hooks/useProducts'
import { Typography } from '@mui/material';

export default function ProductCRUD() {
      console.log('ProductCRUD simple render');
    const {products, isPending} = useProducts();
    if(!products && !!isPending) return <Typography>Loading....</Typography>
  return (
    <div>ProductCRUD</div>
  )
}
