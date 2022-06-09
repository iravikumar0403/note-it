import { useEffect } from "react";

export const useDocumentTitle = (title = "Note It") => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
