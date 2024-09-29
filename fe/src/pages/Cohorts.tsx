import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar/Sidebar';
import {useState, useEffect} from 'react';
import { getCohorts, createCohort } from '../services/CohortsService';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { getSpecialisms } from '../services/SpecialismsService';

const Cohorts = () => {
    const [cohorts, setCohorts] = useState<any[]>([]);
    const [specialisms, setSpecialisms] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [date_start, setDate_start] = useState<string>("");
    const [date_end, setDate_end] = useState<string>("");
    const [specialism_id, setSpecialism_id] = useState<string>("");

    const token = localStorage.getItem('token');

    const fetchCohorts = async () => {
        const response = await getCohorts(token as string);
        setCohorts(response);
    };

    const handleAddCohort = async () => {
        console.log("Adding cohort:");
        console.log(title, date_start, date_end, specialism_id);
        await createCohort(token as string, title, specialism_id, date_start, date_end);
    }

    const fetchSpecialisms = async () => {
        const response = await getSpecialisms(token as string);
        setSpecialisms(response);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=> {
        fetchCohorts();
        fetchSpecialisms();
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
                                <TableCell sx={{ fontWeight: 'bold' }}>Cohort</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Start Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>End Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Specialism</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
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
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                        Add Cohort
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
                            const date_start = formJson.date_start;
                            const date_end = formJson.date_end;
                            const specialism_id = formJson.specialism_id;
                            handleAddCohort();
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Add new cohort</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="title"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="date_start"
                            name="date_start"
                            label="Start Date"
                            type="date"
                            fullWidth
                            variant="standard"
                            value={date_start}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => setDate_start(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="date_end"
                            name="date_end"
                            label="End Date"
                            type="date"
                            fullWidth
                            variant="standard"
                            value={date_end}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => setDate_end(e.target.value)}
                        />
                        <FormControl fullWidth variant="standard" margin="dense">
                        <InputLabel id="specialism-label">Specialism</InputLabel>
                        <Select
                            labelId="specialism-label"
                            id="specialism_id"
                            value={specialism_id}
                            label="Specialism"
                            onChange={(e)=> setSpecialism_id(e.target.value)}
                        >
                            {specialisms.map((specialism) => (
                                <MenuItem key={specialism.id} value={specialism.id}>{specialism.title}</MenuItem>
                            ))}
                        </Select>
                        </FormControl>
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

export default Cohorts;