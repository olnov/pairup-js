import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar/Sidebar';
import { useState, useEffect } from 'react';
import { getSpecialisms, createSpecialism } from '../services/SpecialismsService';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

const Specialisms = () => {
    const [specialisms, setSpecialisms] = useState<any[]>([]);
    const token = localStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [stack, setStack] = useState<string>("");

    const fetchSpecialisms = async () => {
        const response = await getSpecialisms(token as String);
        setSpecialisms(response);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleAddSpecialism = async () => {
        await createSpecialism(token as string, title, stack);
    };

    useEffect(()=> {
        fetchSpecialisms();
    },[]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                <h2>Specialisms</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 850 }} aria-label="Specialisms">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Specialism</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Stack</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {specialisms.map((specialism) => (
                                <TableRow key={specialism.id}>
                                    <TableCell>{specialism.title}</TableCell>
                                    <TableCell>{specialism.stack}</TableCell>
                                    <TableCell>
                                        <Button variant="text">Edit</Button>
                                        <Button variant="text">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={handleOpen}>
                                        Add Specialism
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
                            const title = formJson.title;
                            const stack = formJson.stack;
                            handleAddSpecialism();
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Add new specialism</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="title"
                            name="title"
                            label="Specialism"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="stack"
                            name="stack"
                            label="Stack"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={stack}
                            onChange={(e) => setStack(e.target.value)}
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

export default Specialisms;