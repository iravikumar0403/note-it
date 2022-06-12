import ReactDOM from "react-dom";
import { useModal } from "../../context";
import { FolderModal } from "./FolderModal";

export const Modal = () => {
  const { isVisible, type, dispatch } = useModal();

  const closeModal: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      dispatch({ type: "CLOSE_MODAL" });
    }
  };

  return ReactDOM.createPortal(
    <div>
      {isVisible ? (
        <div
          className="flex px-4 backdrop-blur-sm backdrop-opacity-70 bg-slate-200 bg-opacity-30 fixed top-0 left-0 h-screen w-full"
          onClick={closeModal}
        >
          {(type === "CREATE_FOLDER" || type === "RENAME_FOLDER") && (
            <FolderModal />
          )}
        </div>
      ) : null}
    </div>,
    document.body as HTMLBodyElement
  );
};
