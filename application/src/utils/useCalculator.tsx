import { Cart } from "../models/Cart";

function useCalculator() {
  function getTotalInPounds(cart: Cart): number {
    let total: number = 0;
    cart.items.forEach((item) => {
      total += item.item.price * item.qty
    })
    return total;
  }

  return {
    getTotalInPounds
  }
}

export default useCalculator;