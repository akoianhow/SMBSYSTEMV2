import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useProducts } from "../../lib/hooks/useProducts";


export default function ProductDetail() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {selectedProduct, isLoading} = useProducts(Number(id));



  if (isLoading) return <Typography>Loading....</Typography>;

  if(!selectedProduct) return <Typography>Not found..</Typography>

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia component="img" src="sss" />
      <CardContent>
        <Typography variant="h5">{selectedProduct.name}</Typography>
        <Typography variant="subtitle1">{selectedProduct.categoryName}</Typography>
        <Typography variant="body1">{selectedProduct.description}</Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/editProduct/${selectedProduct.id}`}color="primary">
          Edit
        </Button>
        <Button onClick={() => navigate('/products')} color="inherit">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
