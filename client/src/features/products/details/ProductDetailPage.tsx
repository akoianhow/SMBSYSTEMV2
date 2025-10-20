import {
  Grid,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import { useProducts } from "../../../lib/hooks/useProducts";
import ProductDetailsHeader from "./ProductDetailsHeader";
import ProductDetailsInfo from "./ProductDetailsInfo";
import ProductDetailsChat from "./ProductDetailsChat";
import ProductsDetailsSidebar from "./ProductsDetailsSidebar";


export default function ProductDetailPage() {
  const {id} = useParams();
  const {selectedProduct, isLoading} = useProducts(Number(id));

  if (isLoading) return <Typography>Loading....</Typography>;

  if(!selectedProduct) return <Typography>Not found..</Typography>

  return (
    <Grid container spacing={3}>
        <Grid size={8}>
          <ProductDetailsHeader selectedProduct={selectedProduct} />
          <ProductDetailsInfo selectedProduct={selectedProduct} />
          <ProductDetailsChat />
        </Grid>
        <Grid size={4}>
          <ProductsDetailsSidebar />
        </Grid>
    </Grid>

  );
}
