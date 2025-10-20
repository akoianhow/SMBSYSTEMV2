import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Divider, Typography,} from "@mui/material";

import { Link } from "react-router";
import { useStore } from "../../lib/hooks/useStore";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
const {cart} = useStore();
  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardHeader
        avatar={<Avatar sx={{height: 80, width: 80}} />}
        title = {product.name}
        subheader={
          <>
            Supplier: {product.supplierName}
          </>
        }
      >
      </CardHeader>
      <Divider sx={{mb: 3}}/>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
      >
        <Chip label={product.category?.name} variant="outlined" />
        <Box display="flex" gap={2}>
          <Button component={Link} to={`/products/${product.id}`}  size="medium" variant="contained">
            View
          </Button>
          <Button color='secondary' component={Link} to={`/products/${product.id}`}  size="medium" variant="contained"
          onClick={()=> {cart.addToCart(product)}}>
            Add to cart
          </Button>
         
        </Box>
      </CardActions>
    </Card>
  );
}
