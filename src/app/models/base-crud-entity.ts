import { SelectItem } from 'primeng/api';

export class BaseCrudEntity {
  id?: number;
  nome?: string;

  static asSelectItem<T extends BaseCrudEntity>(
    entity: BaseCrudEntity,
    labelKey: keyof T = 'nome',
    valueKey: keyof T = 'id'
  ): SelectItem<number> {
    return {
      value: entity[valueKey as string],
      label: entity[labelKey as string]
    };
  }

  static asSelectItems<T extends BaseCrudEntity>(entities: BaseCrudEntity[], labelKey?: keyof T, valueKey?: keyof T): SelectItem<number>[] {
    return entities.map(entity => this.asSelectItem(entity, labelKey, valueKey));
  }
}
