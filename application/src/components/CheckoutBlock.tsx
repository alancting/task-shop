import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Cart } from "../models/Cart"
import { PaymentDetails } from "../models/PaymentDetails";
import useApi from "../utils/useApi";
import useCalculator from "../utils/useCalculator";

interface CheckoutBlockProps {
  cart: Cart,
  onPaySuccess: () => void;
  onPayFail: () => void;
}

const CheckoutBlock: React.FC<CheckoutBlockProps> = ({ cart, onPaySuccess, onPayFail }) => {
  const { getTotalInPounds } = useCalculator();
  const { makePayment } = useApi();

  // TODO: Change to formik
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [valid, setValid] = useState(false);

  useEffect(() => {
    let valid = true;
    const price = getTotalInPounds(cart);
    if (price === 0) valid = false;

    if (!firstName) valid = false;
    if (!lastName) valid = false;
    if (!email) valid = false;
    if (!paymentType) valid = false;

    if (paymentType === 'card') {
      if (!cardNumber) valid = false;
      if (!expiryDate) valid = false;
      if (!cvv) valid = false;
    }
    setValid(valid);
  }, [cart, firstName, lastName, email, paymentType, cardNumber, expiryDate, cvv])

  function pay() {
    let paymentDetails: PaymentDetails = {
      cart: cart,
      firstName: firstName,
      lastName: lastName,
      email: email,
      paymentType: paymentType,
    }
    if (paymentType === 'card') {
      paymentDetails.cardNumber = cardNumber;
      paymentDetails.expiryDate = expiryDate;
      paymentDetails.cvv = cvv;
    }
    const result = makePayment(paymentDetails);
    if (result) {
      onPaySuccess();
    } else {
      onPayFail();
    }
  }

  return (
    <Box sx={{ background: '#adadad', paddingX: 2 }}>
      <Box sx={{ display: 'flex', padding: 2, justifyContent: 'center' }}>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>Checkout</Typography>
      </Box>
      <Box sx={{ display: 'flex', padding: 2, alignItems: 'center', flexDirection: "column" }} >
        <TextField
          sx={{ width: '100%', background: '#ffffff', marginY: 1 }}
          label="First Name"
          id="first-name"
          variant="filled"
          value={firstName}
          onChange={(e) => { setFirstName(e.target.value) }}
        />
        <TextField
          sx={{ width: '100%', background: '#ffffff', marginY: 1 }}
          label="Last Name"
          id="last-name"
          variant="filled"
          value={lastName}
          onChange={(e) => { setLastName(e.target.value) }}
        />
        <TextField
          sx={{ width: '100%', background: '#ffffff', marginY: 1 }}
          label="Email address"
          id="email"
          variant="filled"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <RadioGroup
          sx={{ display: 'flex', flexDirection: "row" }}
          aria-labelledby="payment-type-radio-buttons"
          name="payment-type-radio-buttons"
          value={paymentType}
          onChange={(e) => {
            setPaymentType(e.target.value);
          }}
        >
          <FormControlLabel value="card" control={<Radio />} label="Card" />
          <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
        </RadioGroup>
        {paymentType === 'card' ? <>
          <TextField
            sx={{ width: '100%', background: '#ffffff', marginY: 1 }}
            label="Card number"
            id="card-number"
            variant="filled"
            value={cardNumber}
            onChange={(e) => { setCardNumber(e.target.value) }}
          />
          <Box sx={{ display: 'flex', width: '100%', flexDirection: "row", marginY: 1, alignItems: 'center' }}>
            <TextField
              sx={{ width: '100%', background: '#ffffff', marginRight: 1 }}
              label="Expiry Date"
              id="expiry-date"
              variant="filled"
              value={expiryDate}
              onChange={(e) => { setExpiryDate(e.target.value) }}
            />
            <TextField
              sx={{ width: '100%', background: '#ffffff', marginLeft: 1 }}
              label="CVV"
              id="cvv"
              variant="filled"
              value={cvv}
              onChange={(e) => { setCvv(e.target.value) }}
            />
          </Box>
        </> : null}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <Button onClick={() => { pay() }} disabled={!valid} variant="contained" sx={{ width: '100%' }}>
          {`Pay £${getTotalInPounds(cart)}`}
        </Button>
      </Box>
    </Box>
  );
}

export default CheckoutBlock;