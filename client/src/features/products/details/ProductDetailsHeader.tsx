import { Divider, Typography } from "@mui/material"

type Props = {
    selectedProduct: ProductDTO
}
export default function ProductDetailsHeader({selectedProduct} :Props) {
  return (
    <>
      <Typography variant="h3">{selectedProduct.name}</Typography>
      <Divider />
    </>
  
  )
}
