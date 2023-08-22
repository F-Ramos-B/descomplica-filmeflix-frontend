import { Usuario } from './usuario';

export class Login {
  usuario: Partial<Usuario>;
  token: string;
  expires: number;
}
