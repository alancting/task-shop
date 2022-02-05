import { Box, Button, Grid, Typography } from "@mui/material";
import { Cart } from "../models/Cart";
import { Item } from "../models/Item";

interface CartItemBlockProps {
  item: Item;
  qty: number
}

const CartItemBlock: React.FC<CartItemBlockProps> = ({ item, qty }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
        <Grid item xs={4}>
          <Box sx={{ background: '#ffffff', width: '50px', height: '50px' }}></Box>
        </Grid>
        <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box>
            <Typography>{`${item.name} - ${item.currency}${item.price}`}</Typography>
          </Box>
          <Grid container>
            <Grid item xs={4}>
              <Button>Remove</Button>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                <Button>-</Button>
                <Typography sx={{ margin: 2 }}>{qty}</Typography>
                <Button>+</Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box >
  );
};

interface CartBlockProps {
  cart: Cart,
  // onAddToCart: (item: Item) => void
}

const CartBlock: React.FC<CartBlockProps> = ({ cart }) => {
  return (
    <Box sx={{ background: '#adadad' }}>
      <Box sx={{ display: 'flex', padding: 2, justifyContent: 'center' }}>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>Your cart</Typography>
      </Box>
      <Box>
        {cart.items.map((item) => {
          return <CartItemBlock item={item.item} qty={item.qty} />
        })}
      </Box>
      <Box>

      </Box>
    </Box>
  );
}

export default CartBlock;