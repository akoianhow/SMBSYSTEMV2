
import  {useQuery, useQueryClient} from '@tanstack/react-query'
import agent from '../apiAgent';

export const useCategories = ()=> {
    const queryClient = useQueryClient();

    const {data: categories, isPending} = useQuery({
        queryKey: ['categories'],
        queryFn: async() => {
            const response = await agent.get<Category[]>('/categories');
            return response.data;
        },
    })

    return {
        categories,
        isPending
    }
}