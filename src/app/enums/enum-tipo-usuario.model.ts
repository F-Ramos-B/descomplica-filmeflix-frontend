import { BaseEnum, Enum } from './base-enum.model';

export class EnumTipoUsuario extends BaseEnum implements Enum<number> {

  static readonly ADMIN = new EnumTipoUsuario(1, 'Administrador');
  static readonly USUARIO = new EnumTipoUsuario(2, 'Usuário');

  static readonly mappedValues: Map<number, EnumTipoUsuario> = new Map<number, EnumTipoUsuario>(this.getSelfKeys<number>(this));

  // private to disallow creating other instances of this type
  private constructor(public readonly id: number, public readonly descricao: string) { super(); }

}
