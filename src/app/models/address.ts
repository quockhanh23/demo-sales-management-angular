export interface Address {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  address?: string;
  province?: string;
  district?: string;
  ward?: string;
  idUser?: string;
  inUse?: boolean
}
