import { Item } from './Item';

interface ItemWithQuantity {
  item: Item,
  qty: number
}

export interface Cart {
  items: Array<ItemWithQuantity>
}