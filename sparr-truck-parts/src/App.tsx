import React from 'react';
import { Button } from '@mui/material';

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Sparr Truck Parts</h1>
      <p>Welcome to the Sparr Truck Parts site.</p>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </div>
  );
};

export default App;

