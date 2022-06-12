import { createContext, useContext, useReducer } from "react";
import { modalReducer } from "../reducers";
import { ChildrenProp, ModalContextType, ModalState } from "../types";

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

const initialState: ModalState = {
  isVisible: false,
  type: "CREATE_FOLDER",
  selectedFolder: null,
  selectedNote: null,
};

export const ModalProvider = ({ children }: ChildrenProp) => {
  const [{ isVisible, selectedFolder, selectedNote, type }, dispatch] =
    useReducer(modalReducer, initialState);
  console.log({ isVisible, selectedFolder, selectedNote, type });
  return (
    <ModalContext.Provider
      value={{ isVisible, selectedFolder, selectedNote, type, dispatch }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
