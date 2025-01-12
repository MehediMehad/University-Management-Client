import { ReactNode } from "react";

export type TRoute = {
  path?: string;
  element: ReactNode;
  index?: boolean;
};

export type TUserPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  index?: boolean;
  children?: TUserPath[];
};

export type TSidebarItem = {
  name?: string;
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};
