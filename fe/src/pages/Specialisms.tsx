import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar/Sidebar';
import { useState, useEffect } from 'react';
import { getSpecialisms } from '../services/SpecialismsService';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Specialisms = () => {
    const [specialisms, setSpecialisms] = useState<any[]>([]);
    const token = localStorage.getItem('token');

    const fetchSpecialisms = async () => {
        const response = await getSpecialisms(token as String);
        setSpecialisms(response);
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
                                <TableCell>Specialism</TableCell>
                                <TableCell>Stack</TableCell>
                                <TableCell>Actions</TableCell>
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
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Specialisms;