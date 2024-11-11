import {OrderProductDetailDTO} from "./order-product-detail-dto";

export interface OrderProductDTO {
  idOrderProduct?: string;
  createAt?: string;
  status?: string;
  orderProductDetailDTOList?: OrderProductDetailDTO[]
}
