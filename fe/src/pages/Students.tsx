import Box from "@mui/material/Box"
import Sidebar from "../components/Sidebar/Sidebar";

const Students = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <h1>Students</h1>
            </Box>
        </Box>
    );
};

export default Students;