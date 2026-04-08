import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuthenticate } from "~/hooks/useAuthenticate";

export default function LoginForm() {
    const {
        fields,
        onChange,
        authenticate,
        error,
    } = useAuthenticate();

    return (
        <Box>
            <Typography>Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form>
                <Typography>Username:</Typography>
                <TextField type="text" id="username" name="username" value={fields.username} onChange={event => onChange.username(event.target.value)}/>
                <br />
                <Typography>Password:</Typography>
                <TextField type="password" id="password" name="password" value={fields.password} onChange={event => onChange.password(event.target.value)}/>
                <br />
                <Button type="button" onClick={authenticate}>Login</Button>
            </form>
        </Box>
    );
}