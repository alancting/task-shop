import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import useApi from "../utils/useApi";

interface FormProp {
  onSubmitted: () => void;
}
const Form: React.FC<FormProp> = ({ onSubmitted }) => {
  const { submitFeedback } = useApi();

  const [feedback, setFeedback] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    let valid = true;
    if (!feedback) valid = false;
    setValid(valid);
  }, [feedback])

  return (
    <>
      <Box sx={{ display: 'flex', padding: 2, alignItems: 'center', flexDirection: "column" }} >
        <TextField
          sx={{ width: '100%', background: '#ffffff', marginY: 1 }}
          label="Feedback"
          id="feedback"
          variant="filled"
          value={feedback}
          multiline
          maxRows={4}
          onChange={(e) => { setFeedback(e.target.value) }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <Button
          onClick={() => {
            const result = submitFeedback({ feedback: feedback })
            if (result) {
              onSubmitted();
            }
          }}
          disabled={!valid}
          variant="contained"
          sx={{ width: '100%' }}>
          Submit
        </Button>
      </Box>
    </>
  );
}

interface ThankYouProp {
  onNewSale: () => void;
}
const ThankYou: React.FC<ThankYouProp> = ({ onNewSale }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
      <Typography sx={{ marginBottom: 1 }}>Thank You!</Typography>
      <Button variant="contained" onClick={() => { onNewSale() }}>Make a new sales?</Button>
    </Box>
  )
}

function Feedback() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Box sx={{ background: '#adadad', paddingY: 2 }}>
      <Box sx={{ display: 'flex', padding: 2, justifyContent: 'center' }}>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>Feedback</Typography>
      </Box>
      {submitted ?
        <ThankYou onNewSale={() => {
          // Show update state...
          window.location.reload();
        }} /> :
        <Form onSubmitted={() => { setSubmitted(true) }} />
      }
    </Box>
  )
}

export default Feedback;
