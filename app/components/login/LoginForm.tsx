import { Button, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { clientApi } from '~/lib/api/client';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const mutation = useMutation({
          mutationFn: (credentials: { username: string; password: string }) => {
            return clientApi.post('/v1/auth/login', credentials);
          },
          onSuccess: (response) => {
            sessionStorage.setItem('token', response.data.accessToken);
          },
          onError: (error) => {
            setError('Login failed. Please check your credentials and try again.');
          },
    });

    return (
        <div>
            <Typography>Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={(event) => {
                event.preventDefault();
                mutation.mutate({username, password});
            }}>
                <Typography>Username:</Typography>
                <TextField type="text" id="username" name="username" value={username} onChange={event => setUsername(event.target.value)}/>
                <br />
                <Typography>Password:</Typography>
                <TextField type="password" id="password" name="password" value={password} onChange={event => setPassword(event.target.value)}/>
                <br />
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
}