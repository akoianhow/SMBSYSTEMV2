import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../apiAgent";
import type { Supplier } from "../types";

export const useSuppliers = (id?: number) => 
{   
    const queryClient = useQueryClient();
    //Get ALL Suppliers
    const {data: suppliers, isPending } = useQuery({
        queryKey: ['suppliers'],
        queryFn: async() => {
            const response = await agent.get<Supplier[]>('/suppliers');
            return response.data;
        }
    })
    //Get Supplier by ID
    const{ data:selectedSupplier, isLoading} = useQuery({
        queryKey: ['product', id],
        queryFn: async() => {
            const response = await agent.get<Supplier>(`/suppliers/${id}`);
            return response.data;
        },
        enabled: !!id && id > 0
    })

    //Create
    const createSupplier = useMutation({
        mutationFn: async (supplier: Supplier) => {
            await agent.post('/suppliers', supplier);
        },
        onSuccess: async ()=> {
            await queryClient.invalidateQueries({
                queryKey: ['products']
            })
        }
    })

    //Update
    const updateSupplier = useMutation({
        mutationFn: async (supplier: Supplier) => {
            await agent.put('/suppliers', supplier);
        },
        onSuccess: async ()=> {
            await queryClient.invalidateQueries({
                queryKey: ['products']
            })
        }
    })



    return {
        suppliers,
        isPending,
        selectedSupplier,
        isLoading,
        updateSupplier,
        createSupplier

    }
}