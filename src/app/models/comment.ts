import {User} from "./user";
import {Product} from "./product";

export interface Comment {
  id: string;
  content: string;
  createDate: string;
  user: User;
  product: Product;
}
