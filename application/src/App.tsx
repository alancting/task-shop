import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Container, Grid } from '@mui/material';
import ItemBlock from './components/ItemBlock';
import { Item } from './models/Item';
import useApi from './utils/useApi';
import CartBlock from './components/CartBlock';
import CheckoutBlock from './components/CheckoutBlock';
import { Cart } from './models/Cart';

function App() {
  const { fetchItems } = useApi();
  const [items, setItems] = useState<Array<Item>>([]);
  const [cart, setCart] = useState<Cart>({ items: [] });

  useEffect(() => {
    const remoteItems = fetchItems();
    setItems(remoteItems);
  }, []);

  return (
    <Container sx={{ padding: 2 }}>
      <Box>
        <Grid container spacing={2}>
          {items.map((item) => {
            return (
              <Grid key={`grid-item-${item.id}`} item xs={3}>
                <ItemBlock
                  item={item}
                  onAddToCart={(item) => {
                    let matched = false;
                    cart.items.forEach((cartItem, index) => {
                      if (cartItem.item.id === item.id) {
                        cart.items[index].qty += 1;
                        matched = true;
                      }
                    })
                    if (!matched) {
                      cart.items.push({ item: item, qty: 1 })
                    }
                    setCart({ ...cart });
                  }}
                />
              </Grid>
            )
          })}
        </Grid>
      </Box>
      <Box marginTop={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CartBlock cart={cart} />
          </Grid>
          <Grid item xs={6}>
            <CheckoutBlock />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
