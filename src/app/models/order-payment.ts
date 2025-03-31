export interface OrderPayment {
  id?: string;
  idUser?: string;
  idShoppingCart?: string;
  idAddress?: string;
  note?: string;
  totalOrderAmount?: string;
  deliveryMethod?: string;
  estimatedDelivery?: string;
  createdAt?: string;
  updatedAt?: string;
  orderPaymentStatus?: string
}
