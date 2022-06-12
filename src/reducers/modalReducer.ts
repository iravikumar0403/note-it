import { ModalAction, ModalState } from "../types";

export const modalReducer = (state: ModalState, action: ModalAction) => {
  switch (action.type) {
    case "CREATE_FOLDER":
      return {
        ...state,
        type: action.type,
        isVisible: !state.isVisible,
        selectedFolder: null,
        selectedNote: null,
      };
    default:
      return state;
  }
};
