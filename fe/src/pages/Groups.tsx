import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar/Sidebar';
import Paper from '@mui/material/Paper';
import { Button, IconButton, Typography } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';

const groupData = [
    {
        id: 1,
        name: 'Group A',
        membersCount: 3,
        members: ['Alice', 'Bob', 'Charlie'],
    },
    {
        id: 2,
        name: 'Group B',
        membersCount: 3,
        members: ['Dave', 'Eve', 'Mallory'],
    },
    // Add more groups if necessary
];

const Groups = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
                width={"150vh"}
            >
                <Typography variant="h4" gutterBottom>
                    Groups
                </Typography>

                {groupData.length > 0 ? (
                    groupData.map((group) => (
                        <Paper
                            key={group.id}
                            elevation={3}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                p: 2,
                                mb: 2,
                                width: '97%', // Take 80% of the width
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <GroupIcon fontSize="large" sx={{ mr: 2 }} />
                                <Box>
                                    <Typography variant="h6">{group.name}</Typography>
                                    <Typography variant="body2">
                                        {group.membersCount} Team Members
                                    </Typography>
                                    <Typography variant="body2">
                                        Members: {group.members.join(', ')}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box>
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    ))
                ) : (
                    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                        <Typography>No groups found so far. Please create a new one.</Typography>
                    </Paper>
                )}
                <Button variant="contained">Create Group</Button>
            </Box>
        </Box>
    );
};

export default Groups;
