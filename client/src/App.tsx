import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, List, ListItem } from "@mui/material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>("https://localhost:7001/api/products")
      .then((response) => setProducts(response.data));
  }, []);

  return (
    <>
      <Typography variant="h3">Welcome to SarapMagBike</Typography>
      <List>
        {products.map((product, i) => (
          <ListItem key={i}>
            {product.name + " -  " + product.categoryName}
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
