import { SelectItem } from 'primeng/api';

export interface Enum<T> {
  id: T;
  descricao: string;
}

export abstract class BaseEnum {

  private static readonly CHAVE_MAPPED_VALORES_ENUM = 'mappedValues';

  public static valueOf<T>(id: T): Enum<T> {
    return this.getMappedValues<T>().get(id);
  }

  public static getMappedValues<T>(): Map<T, Enum<T>> {
    return this[this.CHAVE_MAPPED_VALORES_ENUM] as Map<T, Enum<T>>;
  }

  public static getValues<T>(): Enum<T>[] {
    return [...this.getMappedValues<T>().values()] as Enum<T>[];
  }

  public static asSelectItem<T>(): SelectItem<T>[] {
    return this.getValues<T>().map((item: Enum<T>) => ({ label: item.descricao, value: item.id }));
  }

  protected static getSelfKeys<T>(clazz: BaseEnum): Iterable<readonly [T, Enum<T>]> {
    const selfKeys = Object.keys(clazz)
      .map(key => {
        const enumItem: Enum<T> = clazz[key] as Enum<T>;
        return [enumItem.id, enumItem];
      })
      .filter(entry => entry[0] && entry[1]);

    return selfKeys as Iterable<readonly [T, Enum<T>]>;
  }

}
