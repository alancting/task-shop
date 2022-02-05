import { Feedback } from "../models/Feedback";
import { Item } from "../models/Item";
import { PaymentDetails } from "../models/PaymentDetails";

function useApi() {
  function fetchItems(): Array<Item> {
    return [
      { id: 1, name: 'Item 1', imageUrl: 'xxxxxx', price: 10, currency: '£' },
      { id: 2, name: 'Item 2', imageUrl: 'xxxxxx', price: 17.5, currency: '£' },
      { id: 3, name: 'Item 3', imageUrl: 'xxxxxx', price: 22, currency: '£' },
      { id: 4, name: 'Item 4', imageUrl: 'xxxxxx', price: 35, currency: '£' },
    ]
  }

  function makePayment(paymentDetails: PaymentDetails): boolean {
    return true
  }

  function submitFeedback(feedback: Feedback): boolean {
    return true
  }

  return {
    fetchItems,
    makePayment,
    submitFeedback
  }
}

export default useApi;