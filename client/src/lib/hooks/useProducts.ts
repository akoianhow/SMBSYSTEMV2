import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../apiAgent";
import { useLocation } from "react-router";
import type { ProductDTO } from "../types";
import { useAccount } from "./useAccounts";

export const useProducts = (id?: number) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const currentUser = useAccount();


  //Get ALL Products
  const { data: products, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await agent.get<ProductDTO[]>("/products");
      return response.data;
    },
    enabled: !id && location.pathname === '/products' && !!currentUser
  });
  // Get product by ID
  const {data: selectedProduct, isLoading} = useQuery({
    queryKey: ['product', id],
    queryFn: async()=> {
      const response = await agent.get<ProductDTO>(`/products/${id}`);
      return response.data;
    },
    enabled: !!id && id > 0 && !!currentUser
  });

  //Get Product with Pagination
  const updateProduct = useMutation({
    mutationFn: async (product: ProductDTO) => {
      await agent.put("/products", product);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const createProduct = useMutation({
    mutationFn: async (product: ProductDTO) => {
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
