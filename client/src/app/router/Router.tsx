import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ProductDashboard from "../../features/products/ProductDashboard";
import ProductForm from "../../features/products/form/ProductForm";
import ProductDetailPage from "../../features/products/details/ProductDetailPage";
import ProductCRUD from "../../features/products/ProductCRUD";
import CategoryDataTable from "../../features/categories/form/CategoryDataTable";
import SuppliersDataTable from "../../features/suppliers/SuppliersDataTable";
import SupplierForm from "../../features/suppliers/SupplierForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductDashboard /> },
      { path: "productsCrud", element: <ProductCRUD /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "editProduct/:id", element: <ProductForm key='create'/> },
      { path: "createProduct", element: <ProductForm /> },

      { path: "categories", element: <CategoryDataTable/>},

      { path: "suppliers", element: <SuppliersDataTable/>},
      { path: "createSupplier", element: <SupplierForm />},
      {path:  "editSupplier/:id", element: <SupplierForm key="edit" />}

    ],
  },
]);
