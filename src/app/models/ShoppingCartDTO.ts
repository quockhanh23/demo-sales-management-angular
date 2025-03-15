import {ShoppingCartDetailDTO} from "./ShoppingCartDetailDTO";

export interface ShoppingCartDTO {
  idOrderProduct?: string;
  createAt?: string;
  status?: string;
  shoppingCartDetailDTOList?: ShoppingCartDetailDTO[]
  totalPrice?: string
}
