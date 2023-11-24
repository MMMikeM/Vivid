import { proxy } from "valtio";
import { ApiObj } from "./tree";

type DialogState = {
  open: boolean;
  node?: ApiObj & { id: number };
};

const initialState: DialogState = { open: false };

export const dialogProxy = proxy<DialogState>(initialState);
