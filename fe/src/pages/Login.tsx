import { useState, ChangeEvent} from "react";
import { Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Logo from '../assets/Logo-GR.png';
import { login } from "../services/AuthService";
import { useNavigate } from "react-router-dom";



const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [remember, setRemember] = useState<boolean>(false);
    const navigate = useNavigate();
    // const [error, setError] = useState("");
    // const [loading, setLoading] = useState(false);
    // const history = useHistory();

    const handleLogin = async() => {
        console.log("Here:[Login]");
        try {
            const data = await login(email, password, remember);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            console.log("Here:[Login successful]");
            navigate("/dashboard");
        } catch (error:any) {
            console.error(error);
            alert("Login failed: " + error.message);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        } else if (e.target.name === "remember") {
            setRemember(e.target.checked);
        }
    };

    return (
        <>
            <Box component="section" sx={{
                width: 400,
                height: 400,
            }}>
                <Card variant='outlined'>
                    <CardContent>
                        <Stack spacing={2}>
                            <center>
                                <img src={Logo} alt="Logo" />
                            </center>
                            <TextField
                                id="email"
                                label="Email"
                                type="email"
                                size='small'
                                name="email"
                                value={email}
                                variant="standard"
                                fullWidth
                                onChange={handleChange}
                            />
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                size='small'
                                name="password"
                                value={password}
                                variant="standard"
                                fullWidth
                                onChange={handleChange}
                            />
                            <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
                            <center>
                                <Checkbox
                                    name="remember"
                                    id="remember" 
                                    onChange={handleChange} 
                                /> Remember me
                            </center>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}

export default Login;