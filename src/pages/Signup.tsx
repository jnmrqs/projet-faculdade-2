import { Button, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomTextField from "../components/CustomTextField";
import { useServer } from "../contexts/ServerContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateBirth, setDateBirth] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const server = useServer();
  const {handleOpen} = useSnackbar();
  const navigate = useNavigate();
  const {user} = useAuth();

  const handleSignup = async () => {
    if(!email || !password || !name || !dateBirth || !lastName ){
      handleOpen("Required fields are empty!", "error");
      return;
    }else if(!isValidDate(dateBirth)){
      handleOpen("Invalid Date", "error");
      return;
    }

    const result = await server.userCreate({email, password, name, birthDate: dateBirth, lastName});
    if(result) navigate("/login")
  }

  function isValidDate(str: string) {
    const data = new Date(str);
    
    if (isNaN(data.getTime())) {
      return false;
    }else{
      return true;
    }
  }

  function mask(str: string) {
    const numbers = str.replace(/\D/g, '');

    let result = '';

    if (numbers.length > 0) {
      result += numbers.substring(0, 2);
    }
    if (numbers.length >= 3) {
      result += '/' + numbers.substring(2, 4);
    }
    if (numbers.length >= 5) {
      result += '/' + numbers.substring(4, 8);
    }

    return result;
  }

  useEffect(() => {
    if(user) navigate("/")
  }, [user])

  return (
    <div className="w-screen h-screen	justify-center content-center items-center flex">
      <form className="min-h-[50vh] bg-zinc-800 w-5/6 max-w-[400px] rounded-lg flex flex-col items-center pt-8 px-5">
        <h2 className="text-white text-3xl font-light tracking-[.25em]">SIGN IN</h2>
        <CustomTextField 
          value={name} 
          label="Name" 
          onChange={(event: any) => setName(event.target.value)}
        />
        <CustomTextField 
          value={lastName} 
          label="Last name" 
          onChange={(event: any) => setLastName(event.target.value)}
        />
        <CustomTextField 
          value={email} 
          label="Email" 
          onChange={(event: any) => setEmail(event.target.value)}
        />
        <CustomTextField 
          value={dateBirth} 
          label="Date of birth" 
          onChange={(event: any) => setDateBirth(mask(event.target.value))}
        />
        <CustomTextField 
          value={password} 
          label="Password" 
          onChange={(event: any) => setPassword(event.target.value)}
        />

        <Button 
          variant="contained" 
          endIcon={<ArrowForwardIcon />}
          sx={{marginTop: 4, width: "80%", maxWidth: 350, borderRadius: 5, padding: 1.10}}
          onClick={handleSignup}
        >
          Signup
        </Button>

        <p className="mt-4 text-zinc-400 mb-1 mt-auto">Already have an account? <Link href="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default Signup;

