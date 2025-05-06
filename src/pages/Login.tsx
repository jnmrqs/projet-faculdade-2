import { Button, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from "../contexts/AuthContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import CustomTextField from "../components/CustomTextField";
import { useNavigate } from "react-router";
import { useServer } from "../contexts/ServerContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {user} = useAuth();
  const {handleOpen} = useSnackbar();
  const navigate = useNavigate();
  const server = useServer();

  const handleLogin = async () => {
    if(!email || !password){
      handleOpen("Required fields are empty!", "error");
      return;
    }

    await server.userLogin(email, password);
  }

  useEffect(() => {
    if(user) navigate("/")
  }, [user])

  return (
    <div className="w-screen h-screen	justify-center content-center items-center flex">
      <form className="min-h-[50vh] bg-zinc-800 w-5/6 max-w-[400px] rounded-lg flex flex-col items-center pt-8 px-5">
        <h2 className="text-white text-3xl font-light tracking-[.25em]">LOGIN DA GURIZADA</h2>
        <CustomTextField 
          value={email} 
          label="TEU EMAIL" 
          onChange={(event) => setEmail(event.target.value)}
        />
        <CustomTextField 
          value={password} 
          label="TUA PASEWORD" 
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button 
          variant="contained" 
          endIcon={<ArrowForwardIcon />}
          sx={{marginTop: 4, width: "80%", maxWidth: 350, borderRadius: 5, padding: 1.10, backgroundColor: "#89db2e"}}
          onClick={handleLogin}
        >
          LOGIN
        </Button>

        <p className="mt-4 text-zinc-400 mb-1 mt-auto">TEM CONTA NAO? <Link href="/signup">CRIA UMA MEU CUPINXA</Link></p>
      </form>
    </div>
  )
}

export default Login;

