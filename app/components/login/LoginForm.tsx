import { Button, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

export default function LoginForm() {
    const mutation = useMutation({

    })
    return (
        <div>
            <Typography>Login</Typography>
            <form>
                <Typography>Username:</Typography>
                <TextField type="text" id="username" name="username" />
                <br />
                <Typography>Password:</Typography>
                <TextField type="password" id="password" name="password" />
                <br />
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
}