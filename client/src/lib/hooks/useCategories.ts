
import  {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import agent from '../apiAgent';
import type { Category } from '../types';

export const useCategories = ()=> {
    const queryClient = useQueryClient();

    const {data: categories, isPending} = useQuery({
        queryKey: ['categories'],
        queryFn: async() => {
            const response = await agent.get<Category[]>('/categories');
            return response.data;
        },
    })

    const deleteCategory = useMutation({
        mutationFn: async(id: number) => {
            await agent.delete(`/categories/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['categories']
            });
        }
    })

    return {
        categories,
        isPending,
        deleteCategory
    }
}