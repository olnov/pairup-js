import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import SchoolIcon from '@mui/icons-material/School';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import Logo from '../../assets/Logo-GR.png';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
        <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >   
                    <center>
                        <img src={Logo} alt="Logo" height="56" width="137"/>
                    </center>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>{navigate("/users")}}>
                                <ListItemIcon>
                                    <PersonOutlineRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="System users" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>{navigate("/groups")}}>
                                <ListItemIcon>
                                    <WorkspacesIcon />
                                </ListItemIcon>
                                <ListItemText primary="Groups" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>{navigate("/students")}}>
                                <ListItemIcon>
                                    <SchoolIcon />
                                </ListItemIcon>
                                <ListItemText primary="Students" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>{navigate("/specialisms")}}>
                                <ListItemIcon>
                                    <LocalLibraryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Specialisms" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>{navigate("/cohorts")}}>
                                <ListItemIcon>
                                    <GroupsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cohorts" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>{navigate("/integrations")}}>
                                <ListItemIcon>
                                    <IntegrationInstructionsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Integrations" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    {/* <Divider /> */}
                </Drawer>
        </>
    );
};

export default Sidebar;