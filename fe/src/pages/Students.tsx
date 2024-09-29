import Box from "@mui/material/Box"
import Sidebar from "../components/Sidebar/Sidebar";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState, useEffect } from "react";
import { getStudents } from "../services/StudentsService";


const Students = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [skillLevel, setSkillLevel] = useState<string>("");
    const [groups, setGroups] = useState<string[]>([]);
    const [cohort, setCohort] = useState<string>("");
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem("token");

    const fetchStudents = async () => {
        const students = await getStudents(token as string);
        setStudents(students);
    }

    useEffect(() => {
        fetchStudents();
    }, []);

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
                                <TableCell><Button variant="contained" color="primary">Add Student</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Students;