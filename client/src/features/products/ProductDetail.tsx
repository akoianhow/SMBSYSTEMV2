import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type Props = {
  product: Product;
  handleSelectCancelProduct: () => void;
  handleOpenForm: (id?: number) => void;
};
export default function ProductDetail({
  product,
  handleSelectCancelProduct,
  handleOpenForm,
}: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia component="img" src="sss" />
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="subtitle1">{product.categoryName}</Typography>
        <Typography variant="body1">{product.description}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleOpenForm(product.id)} color="primary">
          Edit
        </Button>
        <Button onClick={() => handleSelectCancelProduct()} color="inherit">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
