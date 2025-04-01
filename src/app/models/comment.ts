import {User} from "./user";
import {Product} from "./product";

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
  product: Product;
}
