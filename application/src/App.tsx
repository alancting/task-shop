import React, { useState } from 'react';
import { Container } from '@mui/material';
import Shop from './components/Shop';
import Feedback from './components/Feedback';


function App() {
  const [afterSale, setAfterSale] = useState(false);

  return (
    <Container sx={{ padding: 2 }}>
      {!afterSale ?
        <Shop onPaySuccess={() => setAfterSale(true)} />
        : <Feedback />
      }
    </Container>
  );
}

export default App;
