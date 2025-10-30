import {useForm} from 'react-hook-form';
import { useAccount } from '../../lib/hooks/useAccounts';
import { loginSchema, type LoginSchema } from '../../lib/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { Box, Button, Paper, Typography } from '@mui/material';
import { LockOpen } from '@mui/icons-material';
import TextInput from '../../app/shared/components/TextInput';
import { Link } from 'react-router';
import { registerSchema, type RegisterSchema } from '../../lib/schemas/registerSchema';

export default function LoginForm() {
    const { registerUser } = useAccount();
    const {control, handleSubmit, formState: {isValid, isSubmitting}} = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                console.log(error.message);
            }
        });
    }
  return (
    <Paper 
        component='form' onSubmit={handleSubmit(onSubmit)}
        sx={{display:'flex', 
            flexDirection: 'column', 
            p:3,
            gap:3,
            maxWidth: 'md',
            mx: 'auto',
            borderRadius: 3
        }}
        >
        <Box display='flex' alignItems='center' justifyContent='center'
        gap={3} color='secondary.main'>
        <LockOpen fontSize='large' />
        <Typography variant='h4'>Register</Typography>
        </Box>
        <TextInput label='Email' control={control} name='email' />
        <TextInput label='Display Name' control={control} name='displayName' />
        <TextInput label='Password' control={control} name='password'/>
        <Button type='submit' disabled={!isValid || isSubmitting}
        size='large' variant='contained'>
            Register
        </Button>

        <Typography sx={{textAlign: 'center'}}>
            Already have an account?
            <Typography component={Link} to='/login' color='primary'>
                Login
            </Typography>
        </Typography>

    </Paper>
  )
}
