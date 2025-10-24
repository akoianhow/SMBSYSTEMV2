import { Grid, Typography } from "@mui/material";
import { useProducts } from "../../lib/hooks/useProducts";
import ProductDataTable from "./form/ProductDataTable";

export default function ProductDashboard() {
  const { products, isPending } = useProducts();

  if (!products && !!isPending) return <Typography>Loading....</Typography>;

  return (
    <Grid container spacing={3}>
        <ProductDataTable />
    </Grid>
  );
}
