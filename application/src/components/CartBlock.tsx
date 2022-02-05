import { Box, Button, Grid, Typography } from "@mui/material";
import { Cart } from "../models/Cart";
import { Item } from "../models/Item";
import useCalculator from "../utils/useCalculator";

interface CartItemBlockProps {
  item: Item;
  qty: number,
  onRemove: (item: Item) => void,
  onItemAdd: (item: Item) => void,
  onItemDeduct: (item: Item) => void
}

const CartItemBlock: React.FC<CartItemBlockProps> = ({ item, qty, onRemove, onItemAdd, onItemDeduct }) => {
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
              <Button onClick={() => { onRemove(item) }}>Remove</Button>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                <Button onClick={() => { onItemDeduct(item) }}>-</Button>
                <Typography sx={{ margin: 2 }}>{qty}</Typography>
                <Button onClick={() => { onItemAdd(item) }}>+</Button>
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
  onRemove: (item: Item) => void,
  onItemAdd: (item: Item) => void,
  onItemDeduct: (item: Item) => void
}

const CartBlock: React.FC<CartBlockProps> = ({ cart, onRemove, onItemAdd, onItemDeduct }) => {
  const { getTotalInPounds } = useCalculator();

  return (
    <Box sx={{ background: '#adadad' }}>
      <Box sx={{ display: 'flex', padding: 2, justifyContent: 'center' }}>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>Your cart</Typography>
      </Box>
      <Box>
        {cart.items.map((item) => {
          return (
            <CartItemBlock
              item={item.item}
              qty={item.qty}
              onRemove={onRemove}
              onItemAdd={onItemAdd}
              onItemDeduct={onItemDeduct}
            />
          )
        })}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', background: '#5c5c5c', width: '80%', padding: 2 }} >
          <Typography variant="h5" sx={{ marginBottom: 1 }}>{`Total: £${getTotalInPounds(cart)}`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CartBlock;