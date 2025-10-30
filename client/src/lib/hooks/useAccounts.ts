import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginSchema } from "../schemas/loginSchema"
import agent from "../apiAgent"
import type { User } from "../types"
import { useNavigate } from "react-router"
import type { RegisterSchema } from "../schemas/registerSchema"
import { toast } from "react-toastify"

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const loginUser = useMutation({
        mutationFn: async(creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            })
            await navigate('/');
        }
    })

    const { data: currentUser, isLoading: loadingUserInfo} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info')
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user'])
    })

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            const result = await agent.post('/account/register', creds);
            console.log(result.data);
        },
        onError: (error) => {
            console.log(error.message);
            return error.message;
        },
        onSuccess: ()=> {
            toast.success('Registration successful - you can now login.');
            navigate('/login');
        }
    });


    const logoutUser = useMutation({
        mutationFn: async() => {
            await agent.post('/account/logout');
        }, 
        onSuccess: async() => {
            queryClient.removeQueries({queryKey: ['user']});
            navigate('/');
        }
    },
)


    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser
    }
}