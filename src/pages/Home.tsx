import React from 'react';
import { Toolbar } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const {user} = useAuth();
  
  if(!user)return null;

  const maskDate = (input: string) => {
    const date = new Date(input);
    console.log("🚀 ~ maskDate ~ date:", date.getDate())
    
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
  }

  return (
    <>
      <Toolbar />
      <div>
        <div>
          <strong>Name: </strong>
          <span>{user.data.name}</span>
        </div>

        <div>
          <strong>Last name: </strong>
          <span>{user.data.lastName}</span>
        </div>

        <div>
          <strong>BirthDate: </strong>
          <span>{maskDate(user.data.birthDate)}</span>
        </div>

      </div>
    </>
  );
}

export default Home;