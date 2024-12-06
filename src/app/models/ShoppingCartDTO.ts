import {ShoppingCartDetailDTO} from "./ShoppingCartDetailDTO";

export interface OrderProductDTO {
  idOrderProduct?: string;
  createAt?: string;
  status?: string;
  orderProductDetailDTOList?: ShoppingCartDetailDTO[]
}
