import { useQuery } from "@tanstack/react-query"
import agent from "../apiAgent";

export const useSuppliers = () => 
{
    const {data: suppliers, isPending } = useQuery({
        queryKey: ['suppliers'],
        queryFn: async() => {
            const response = await agent.get<Supplier[]>('/suppliers');
            return response.data;
        }
    })

    return {
        suppliers,
        isPending
    }
}