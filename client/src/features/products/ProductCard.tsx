import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useProducts } from "../../lib/hooks/useProducts";
import { Link } from "react-router";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { deleteProduct, isPending } = useProducts();
  const handleDeleteProduct = (id: number) => {
    deleteProduct.mutateAsync(id);
  };

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
      >
        <Chip label={product.categoryName} variant="outlined" />
        <Box display="flex" gap={2}>
          <Button component={Link} to={`/products/${product.id}`}  size="medium" variant="contained">
            View
          </Button>
          <Button
            onClick={() => handleDeleteProduct(product.id)}
            size="medium"
            variant="contained"
            color="error"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
