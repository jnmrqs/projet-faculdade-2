import React, { useEffect, useState } from "react";
import { Box, List, Toolbar } from '@mui/material';
import DrawerItem from "../DrawerItem";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

const CustomDrawer: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const drawerWidth = windowWidth > 700 ? 240 : 55;
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <Box sx={
      { width: drawerWidth, boxSizing: 'border-box', zIndex: 1, backgroundColor: "#27272a", color: "white", borderRightWidth: "1px", borderColor: "#3f3f46", minHeight: "100vh" }
    }>
      <Toolbar />
      <Box sx={{ overflow: 'hidden' }}>
        <List>
          <DrawerItem onClick={() => navigate("/")} text="Home Page" windowWidth={windowWidth} icon={<HomeIcon sx={{color: "white"}}/>}/>
        </List>
      </Box>
    </Box>
  )
}

export default CustomDrawer;