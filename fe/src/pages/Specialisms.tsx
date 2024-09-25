import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar/Sidebar';

const Specialisms = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <h1>Specialisms</h1>
            </Box>
        </Box>
    );
};

export default Specialisms;