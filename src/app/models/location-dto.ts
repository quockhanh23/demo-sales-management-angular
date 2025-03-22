import {DataLocation} from "./data-location";

export interface LocationDTO {
  total: string;
  data: DataLocation[];
  code: string;
  message: string;
}
