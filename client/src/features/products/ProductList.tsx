import { Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { useProducts } from "../../lib/hooks/useProducts";

export default function ProductList() {
  const { products, isPending } = useProducts();
  if (!products || isPending) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {products.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </Box>
  );
}
