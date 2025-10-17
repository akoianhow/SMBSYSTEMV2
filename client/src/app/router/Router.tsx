import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ProductDashboard from "../../features/products/ProductDashboard";
import ProductForm from "../../features/products/form/ProductForm";
import ProductDetail from "../../features/products/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductDashboard /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "editProduct/:id", element: <ProductForm key='create'/> },
      { path: "createProduct", element: <ProductForm /> },
    ],
  },
]);
