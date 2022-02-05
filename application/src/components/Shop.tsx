import { Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { Cart } from "../models/Cart";
import { Item } from "../models/Item";
import useApi from "../utils/useApi";
import CartBlock from "./CartBlock";
import CheckoutBlock from "./CheckoutBlock";
import ItemBlock from "./ItemBlock";

interface ShopProps {
  onPaySuccess: () => void;
}

const Shop: React.FC<ShopProps> = ({ onPaySuccess }) => {
  const { fetchItems } = useApi();
  const [items, setItems] = useState<Array<Item>>([]);
  const [cart, setCart] = useState<Cart>({ items: [] });

  useEffect(() => {
    const remoteItems = fetchItems();
    setItems(remoteItems);
  }, []);

  function addItemToCart(item: Item) {
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
  }

  function deductItemToCart(item: Item) {
    let reachZero = false;
    cart.items.forEach((cartItem, index) => {
      if (cartItem.item.id === item.id) {
        cart.items[index].qty -= 1;
        if (cart.items[index].qty === 0) {
          reachZero = true;
        }
      }
    })
    if (reachZero) {
      removeItemToCart(item);
    } else {
      setCart({ ...cart });
    }
  }

  function removeItemToCart(item: Item) {
    const newCartItems = cart.items.filter((cartItem) => {
      return (cartItem.item.id !== item.id)
    })
    setCart({
      ...cart,
      items: newCartItems
    });
  }

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          {items.map((item) => {
            return (
              <Grid key={`grid-item-${item.id}`} item xs={3}>
                <ItemBlock
                  item={item}
                  onAddToCart={(item) => {
                    addItemToCart(item);
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
            <CartBlock
              cart={cart}
              onRemove={(item) => {
                removeItemToCart(item)
              }}
              onItemAdd={(item) => {
                addItemToCart(item);
              }}
              onItemDeduct={(item) => {
                deductItemToCart(item);
              }} />
          </Grid>
          <Grid item xs={6}>
            {cart.items.length > 0 ?
              <CheckoutBlock
                cart={cart}
                onPayFail={() => { console.warn('Missing') }}
                onPaySuccess={onPaySuccess}
              />
              : null}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Shop;