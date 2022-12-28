export interface IJTableHeader {
  attrs:
    | {
    prop: string;
    label: String;
    [attrs: string]: any;
  }
    | {
    type?: string;
    [attrs: string]: any;
  };
  custom?: boolean;
  customHeader?: boolean;
}

export type JTableDataType = Record<string, any>[]
