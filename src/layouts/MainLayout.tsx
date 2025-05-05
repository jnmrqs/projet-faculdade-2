import React, { useEffect } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { Box } from "@mui/material";
import CustomDrawer from "../components/CustomDrawer";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const MainLayout: React.FC = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!user) navigate("/login")
  }, [user])
    
  return (
    <div>
      <HeaderComponent />
      <Box style={{ display: 'flex' }}>
        <CustomDrawer />
        
        {/* Box Main */}
        <Box sx={{ p: 3, overflow: "scroll", flexGrow: 1, scrollbarWidth: "none" }}>
          <Outlet />
        </Box>

      </Box>
    </div>
  );
}

export default MainLayout;