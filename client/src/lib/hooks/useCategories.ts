
import  {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import agent from '../apiAgent';
import type { Category } from '../types';


export const useCategories = (id?: number)=> {
    const queryClient = useQueryClient();

    const {data: categories, isPending} = useQuery({
        queryKey: ['categories'],
        queryFn: async() => {
            const response = await agent.get<Category[]>('/categories');
            return response.data;
        },
    })

    //Get category by id
    const {data: selectedCategory, isLoading } = useQuery({
        queryKey: ['category', id],
        queryFn: async() => {
            const response = await agent.get<Category>(`/categories/${id}`);
            const categ = response.data as Category;
            console.log("CATEGNAME:" + categ.name);
            return response.data;
        },
        enabled: !!id 

    });

    const updateCategory = useMutation({
        mutationFn: async(category: Category) => {
            await agent.put('/categories', category)
        },
        onSuccess: async() => {
            await queryClient.invalidateQueries({
                queryKey: ['categories']
            })
        }
    })

    const createCategory = useMutation({
        mutationFn: async(category: Category) => {
            await agent.post('/categories', category)
        },
        onSuccess: async()=> {
            await queryClient.invalidateQueries({
                queryKey: [categories]
            })
        }
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
        deleteCategory,
        selectedCategory,
        isLoading,
        updateCategory,
        createCategory
    }
}