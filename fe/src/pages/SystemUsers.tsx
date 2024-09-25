import Box from "@mui/material/Box"
import Sidebar from "../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { createUser, getUsers } from "../services/UsersService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


const SystemUsers: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [full_name, setFull_name] = useState<string>("");
    const [confirm_password, setConfirm_password] = useState<string>("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const portalUsers = await getUsers(token as string);
        setUsers(portalUsers);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddUser = async () => {
        await createUser(token as string, email as string, password as string, full_name as string);
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <h2>Portal users</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 750 }} aria-label="Portal users">
                        <TableHead>
                            <TableRow>
                                <TableCell>Full name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.full_name}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Button variant="text" color="primary">
                                            Edit
                                        </Button>
                                        &nbsp;|&nbsp;
                                        <Button variant="text" color="secondary">
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                        Add new user
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries((formData as any).entries());
                            const full_name = formJson.full_name;
                            const email = formJson.email;
                            const password = formJson.password;
                            const confirm_password = formJson.confirm_password;
                            console.log(email);
                            handleAddUser();
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Add new user</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="full_name"
                            name="full_name"
                            label="Full Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={full_name}
                            onChange={(e) => setFull_name(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="confirm_password"
                            name="confirm_password"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={confirm_password}
                            onChange={(e) => setConfirm_password(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default SystemUsers;