import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar/Sidebar';

const Cohorts = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <h1>Cohorts</h1>
            </Box>
        </Box>
    );
};

export default Cohorts;