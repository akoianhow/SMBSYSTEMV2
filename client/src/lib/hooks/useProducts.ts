import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../apiAgent";
import { useLocation } from "react-router";

export const useProducts = (id?: number) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { data: products, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await agent.get<Product[]>("/products");
      return response.data;
    },
    enabled:  location.pathname === '/products'
  });

  const {data: selectedProduct, isLoading} = useQuery({
    queryKey: ['product', id],
    queryFn: async()=> {
      console.log('with id');
      const response = await agent.get<Product>(`/products/${id}`);
      console.log(response.data);
      return response.data;
    },
    enabled: !!id && id > 0
  });

  const updateProduct = useMutation({
    mutationFn: async (product: Product) => {
      product.categoryId = 1;
      product.supplierId = 1;
      await agent.put("/products", product);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const createProduct = useMutation({
    mutationFn: async (product: Product) => {
      product.categoryId = 1;
      product.supplierId = 1;
      const response = await agent.post("/products", product);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: number) => {
      await agent.delete(`/products/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
  return {
    products,
    isPending,
    updateProduct,
    createProduct,
    deleteProduct,
    selectedProduct,
    isLoading
  };
};
