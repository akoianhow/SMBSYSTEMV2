import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import ProductDashboard from "../../features/products/ProductDashboard";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSeletedProduct] = useState<Product | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);

  const handleSelectProduct = (id: number) => {
    setSeletedProduct(products.find((x) => x.id === id));
  };

  const handleSelectCancelProduct = () => {
    setSeletedProduct(undefined);
  };

  const handleOpenForm = (id?: number) => {
    if (id) handleSelectProduct(id);
    else handleSelectCancelProduct();
    console.log("setting edit mod true");
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleSubmitForm = (product: Product) => {
    if (product.id) {
      console.log(`updating product id....${product.id} - ${product.name}`);
      setProducts(products.map((x) => (x.id === product.id ? product : x)));
    } else {
      console.log("adding....");
      product.id = products.length + 1;
      setProducts([...products, { ...product }]);
    }
    setEditMode(false);
    setSeletedProduct(product);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((x) => x.id !== id));
  };

  useEffect(() => {
    axios
      .get<Product[]>("https://localhost:7001/api/products")
      .then((response) => setProducts(response.data));
  }, []);

  return (
    <Box sx={{ bgcolor: "#eeeeee" }}>
      <CssBaseline />
      <NavBar handleOpenForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ProductDashboard
          products={products}
          handleSelectProduct={handleSelectProduct}
          handleSelectCancelProduct={handleSelectCancelProduct}
          selectedProduct={selectedProduct}
          handleOpenForm={handleOpenForm}
          handleFormClose={handleFormClose}
          editMode={editMode}
          handleSubmitForm={handleSubmitForm}
          handleDelete={handleDelete}
        />
      </Container>
    </Box>
  );
}

export default App;
