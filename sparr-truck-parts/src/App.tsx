import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button } from '@mui/material';
import { TruckInventory } from './components/TruckInventory.tsx';





const App: React.FC = () => {
  
  return (
    <div style={{ textAlign: 'center'}}>
      <h1>Truck inventory</h1>

      <TruckInventory />

      <h1>Sparr Truck Parts</h1>
      <p>Welcome to the Sparr Truck Parts site.</p>
      <Button variant="contained" color="primary">
          Click Me
      </Button>
    </div>
  );
};

export default App;

