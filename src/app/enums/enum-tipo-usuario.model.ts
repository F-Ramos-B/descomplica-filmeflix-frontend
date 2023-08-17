import { BaseEnum, Enum } from './base-enum.model';

export class EnumTipoUsuario extends BaseEnum implements Enum<number> {

  static readonly ADMIN = new EnumTipoUsuario(1, 'ADMIN', 'Administrador');
  static readonly USUARIO = new EnumTipoUsuario(2, 'USUARIO', 'Usuário');

  static readonly values: EnumTipoUsuario[] = [
    EnumTipoUsuario.ADMIN,
    EnumTipoUsuario.USUARIO
  ];

  static readonly is = {
    ADMIN: (id: number): boolean => EnumTipoUsuario.ADMIN.id === id,
    USUARIO: (id: number): boolean => EnumTipoUsuario.USUARIO.id === id
  };

  // private to disallow creating other instances of this type
  private constructor(public readonly id: number, public readonly nome: string, public readonly descricao: string) { super(); }

}
