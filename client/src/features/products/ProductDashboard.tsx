import { Grid } from "@mui/material";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import ProductForm from "./form/ProductForm";

type Props = {
  products: Product[];
  handleSelectProduct: (id: number) => void;
  handleSelectCancelProduct: () => void;
  selectedProduct?: Product;
  handleOpenForm: (id?: number) => void;
  handleFormClose: () => void;
  editMode: boolean;
  handleSubmitForm: (product: Product) => void;
  handleDelete: (id: number) => void;
};

export default function ProductDashboard({
  products,
  handleSelectCancelProduct,
  handleSelectProduct,
  selectedProduct,
  handleFormClose,
  handleOpenForm,
  editMode,
  handleSubmitForm,
  handleDelete,
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ProductList
          products={products}
          handleSelectProduct={handleSelectProduct}
          handleDelete={handleDelete}
        ></ProductList>
      </Grid>
      <Grid size={5}>
        {selectedProduct && !editMode && (
          <ProductDetail
            product={selectedProduct}
            handleSelectCancelProduct={handleSelectCancelProduct}
            handleOpenForm={handleOpenForm}
          />
        )}
        {editMode && (
          <ProductForm
            handleFormClose={handleFormClose}
            selectedProduct={selectedProduct}
            handleSubmitForm={handleSubmitForm}
          />
        )}
      </Grid>
    </Grid>
  );
}
