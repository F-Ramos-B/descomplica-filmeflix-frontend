import { Usuario } from "./usuario";

export class Avaliacao {
  id?: number;
  nota?: number;
  critica?: string;
  createdAt?: string;
  updatedAt?: string;
  usuario?: Usuario;
}
