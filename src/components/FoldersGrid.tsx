import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../config/supabaseClient";
import { folderType } from "../types/folder.types";
import { FolderCard } from "./FolderCard";

export const FoldersGrid = () => {
  const [folders, setFolders] = useState<folderType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("folders")
        .select("*, notes!inner(*)")
        .order("created_at", { ascending: false });
      if (data) {
        setFolders(data);
      }
      if (error) {
        toast.error(error.message);
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex flex-wrap justify-center">
      {folders.map((folder) => (
        <FolderCard folder={folder} key={folder.id} />
      ))}
    </div>
  );
};
