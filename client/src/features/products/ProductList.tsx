import { Box } from "@mui/material";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  handleSelectProduct: (id: number) => void;
  handleDelete: (id: number) => void;
};

export default function ProductList({
  products,
  handleSelectProduct,
  handleDelete,
}: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {products.map((product, i) => (
        <ProductCard
          handleDelete={handleDelete}
          handleSelectProduct={handleSelectProduct}
          key={i}
          product={product}
        />
      ))}
    </Box>
  );
}
