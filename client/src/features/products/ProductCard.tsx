import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

type Props = {
  product: Product;
  handleSelectProduct: (id: number) => void;
  handleDelete: (id: number) => void;
};

export default function ProductCard({
  product,
  handleSelectProduct,
  handleDelete,
}: Props) {
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
          <Button
            onClick={() => handleSelectProduct(product.id)}
            size="medium"
            variant="contained"
          >
            View
          </Button>
          <Button
            onClick={() => handleDelete(product.id)}
            size="medium"
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
