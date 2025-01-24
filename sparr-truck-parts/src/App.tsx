import React from 'react';
import { Button } from '@mui/material';
import { Navbar } from './components/Navbar.tsx';

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center'}}>

      {/*This would go in the pages 
      but since we dont have any yet, we can preview it here*/}
      {/*  <Navbar/>  */}

      <h1>Sparr Truck Parts</h1>
      <p>Welcome to the Sparr Truck Parts site.</p>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </div>
  );
};

export default App;

