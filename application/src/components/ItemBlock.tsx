import { Box, Button, Typography } from "@mui/material";
import { Item } from "../models/Item";

interface ItemBlockProps {
  item: Item,
  onAddToCart: (item: Item) => void
}

const ItemBlock: React.FC<ItemBlockProps> = ({ item, onAddToCart }) => {
  return (
    <Box sx={{ border: 'black 1px solid' }}>
      <Box sx={{ width: '100%', height: '100px' }}></Box>
      {/* <img
        src={item.imageUrl}
        alt={item.name}
        loading="lazy"
      /> */}
      <Box sx={{ background: '#adadad', padding: 2 }}>
        <Typography sx={{ marginBottom: 1 }}>{`${item.name} ${item.currency}${item.price}`}</Typography>
        <Button variant="outlined" onClick={() => { onAddToCart(item) }}>Add to cart</Button>
      </Box>
    </Box>
  );
}

export default ItemBlock;