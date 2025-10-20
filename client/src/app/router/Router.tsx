import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ProductDashboard from "../../features/products/ProductDashboard";
import ProductForm from "../../features/products/form/ProductForm";
import ProductDetailPage from "../../features/products/details/ProductDetailPage";
import ProductCRUD from "../../features/products/ProductCRUD";

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
    ],
  },
]);
