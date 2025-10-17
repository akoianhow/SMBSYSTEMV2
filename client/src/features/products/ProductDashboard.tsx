import { Grid, Typography } from "@mui/material";
import ProductList from "./ProductList";
import { useProducts } from "../../lib/hooks/useProducts";

export default function ProductDashboard() {
  const { products, isPending } = useProducts();

  if (!products && !!isPending) return <Typography>Loading....</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ProductList />
      </Grid>
      <Grid size={5}>Something goes here</Grid>
    </Grid>
  );
}
