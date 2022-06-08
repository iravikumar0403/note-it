import { ToastContainer } from "react-toastify";
import reactDom from "react-dom";
import "react-toastify/dist/ReactToastify.css";

export const Toast = () => {
  return reactDom.createPortal(
    <ToastContainer />,
    document.getElementById("root") as HTMLElement
  );
};
