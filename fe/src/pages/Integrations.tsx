import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar/Sidebar';

const Integrations = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
                width={"150vh"}
            >
                <h1>Integrations</h1>
            </Box>
        </Box>
    );
};

export default Integrations;