import Box from "@mui/material/Box"
import Sidebar from "../components/Sidebar/Sidebar";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { createStudent, getStudents } from "../services/StudentsService";
import { getCohorts } from "../services/CohortsService";


const Students = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [skillLevel, setSkillLevel] = useState<string>("");
    const [groups, setGroups] = useState<string[]>([]);
    const [cohorts, setCohorts] = useState<any[]>([]);
    const [cohort_id, setCohort_id] = useState<string>("");
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem("token");

    const fetchStudents = async () => {
        const students = await getStudents(token as string);
        setStudents(students);
    }

    useEffect(() => {
        fetchStudents();
        fetchCohorts();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchCohorts = async () => {
        const response = await getCohorts(token as string);
        setCohorts(response);
    };

    const handleAddStudent = async () => {
        console.log("Adding student:");
        console.log(fullName, email, skillLevel, cohort_id);
        await createStudent(token as string, fullName, email, skillLevel, cohort_id);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                <h2>Students</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 850 }} aria-label="Students">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Full Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Skill Level</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Groups</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Cohort</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.full_name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.skill_level}</TableCell>
                                    <TableCell>{student.groups}</TableCell>
                                    <TableCell>{student.cohort_title}</TableCell>
                                    <TableCell>
                                        <Button variant="text">Edit</Button>
                                        <Button variant="text">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell><Button variant="contained" color="primary" onClick={handleClickOpen}>Add Student</Button></TableCell>
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
                            const fullName = formJson.full_name;
                            const email = formJson.email;
                            const skillLevel = formJson.skill_level;
                            const cohort_id = formJson.cohort_id;
                            console.log(email);
                            handleAddStudent();
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Add new student</DialogTitle>
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
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
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
                            id="skill_level"
                            name="skill_level"
                            label="Skill Level"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={skillLevel}
                            onChange={(e) => setSkillLevel(e.target.value)}
                        />
                        <FormControl fullWidth variant="standard" margin="dense">
                        <InputLabel id="cohort-label">Cohort</InputLabel>
                        <Select
                            labelId="cohort-label"
                            id="cohort_id"
                            value={cohort_id}
                            label="Specialism"
                            onChange={(e)=> setCohort_id(e.target.value)}
                        >
                            {cohorts.map((cohort) => (
                                <MenuItem key={cohort.id} value={cohort.id}>{cohort.title}</MenuItem>
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

export default Students;