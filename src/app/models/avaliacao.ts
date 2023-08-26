import { Usuario } from "./usuario";

export class Avaliacao {
  id?: number;
  idFilme?: number;
  idPlaylist?: number;
  nota?: number;
  critica?: string;
  createdAt?: string;
  updatedAt?: string;
  usuario?: Usuario;
}
