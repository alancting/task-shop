import { Cart } from "./Cart";

export type PaymentDetails = {
  cart: Cart,
  firstName: string,
  lastName: string,
  email: string,
  paymentType: string,
  cardNumber?: string,
  expiryDate?: string,
  cvv?: string,
}