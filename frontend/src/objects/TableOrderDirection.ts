export enum TableOrderDirectionEnum {
  NONE = 0,
  ASC = 1,
  DESC = -1,
}

export interface TableOrderDirection {
  key: string;
  direction: TableOrderDirectionEnum;
}
