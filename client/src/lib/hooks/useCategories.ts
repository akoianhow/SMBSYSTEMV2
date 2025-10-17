import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'

export const useCategories = ()=> {
    const queryClient = useQueryClient();

    const {data: categories, isPending} = useQuery({
        queryKey: ['categories'],
        queryFn: async() => {
        
        },
    })

    return {
        categories,
        isPending
    }
}