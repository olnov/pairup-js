import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar/Sidebar';
import {useState, useEffect} from 'react';
import { getCohorts } from '../services/CohortsService';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Cohorts = () => {
    const [cohorts, setCohorts] = useState<any[]>([]);
    const token = localStorage.getItem('token');

    const fetchCohorts = async () => {
        const response = await getCohorts(token as string);
        console.log(response);
        setCohorts(response);
    };

    useEffect(()=> {
        fetchCohorts();
    },[]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                <h2>Cohorts</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 850 }} aria-label="Cohorts">
                        <TableHead>
                            <TableRow>
                                <TableCell>Cohort</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Specialism</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cohorts.map((cohort) => {
                                return (
                                    <TableRow key={cohort.id}>
                                        <TableCell>{cohort.title}</TableCell>
                                        <TableCell>{cohort.date_start}</TableCell>
                                        <TableCell>{cohort.date_end}</TableCell>
                                        <TableCell>{cohort.specialism_title}</TableCell>
                                        <TableCell>
                                            <Button variant="text">Edit</Button>
                                            <Button variant="text">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>                    
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Cohorts;