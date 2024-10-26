export type basicType = string | number | boolean | object | null | undefined

export interface keyValue<T = basicType | basicType[]> {
    [key: string]: T | keyValue<T>;
}

export interface Engagement {
  id: number;
  name: string;
  icon: "messenger" | "instagram";
  engaged: number;
  unique: number;
  acquired: number;
  conversion: number;
  metaInfo: keyValue
}
