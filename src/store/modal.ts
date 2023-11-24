import { proxy } from "valtio";

type ModalState = {
  isOpen: boolean;
  type: ModalTypes;
};

type ModalTypes = "add" | "edit" | "delete" | "filter";

const initialState: ModalState = {
  isOpen: false,
  type: "filter",
};

export const modalProxy = proxy<ModalState>(initialState);
