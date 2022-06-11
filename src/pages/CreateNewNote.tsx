import { useEffect, useState } from "react";
import { ButtonWithLoader, Navbar } from "../components";
import { useEditor, EditorContent, FloatingMenu } from "@tiptap/react";
import { AiOutlineUnorderedList, AiOutlineOrderedList } from "react-icons/ai";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { supabase } from "../config/supabaseClient";
import { toast } from "react-toastify";
import { folderType } from "../types/folder.types";
import { useNavigate } from "react-router-dom";

export const CreateNewNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [folders, setFolders] = useState<folderType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("folders").select();
      if (error) {
        console.log(toast.error(error.message));
      }
      if (data) {
        setFolders(data);
        setSelectedFolder(data[0].id);
      }
    })();
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write awesome notes",
        emptyNodeClass: "text-gray-200",
        showOnlyWhenEditable: true,
      }),
    ],
    content: "",
  });

  const handleSave = async () => {
    if (title === "") {
      toast.error("Please enter the note title");
      return;
    }
    setIsLoading(true);
    const content = editor?.getJSON();
    const text_content = editor?.getText();
    const { data, error } = await supabase.from("notes").insert([
      {
        title,
        content,
        text_content,
        tags: [],
        folder_id: selectedFolder,
      },
    ]);
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      console.log(data);
      navigate("/dashboard/notes");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="editor m-2">
        <textarea
          className="border-2 rounded w-full p-2 text-lg resize-none"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
        <div className="tiptap-editor">
          {editor && (
            <div className="flex flex-col sm:flex-row-reverse sm:items-center justify-between my-1">
              <div className="ml-auto flex items-center">
                <label>Save to</label>
                <select
                  className="p-2 mx-2 px-4 rounded"
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                >
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.folder_name}
                    </option>
                  ))}
                </select>
                <ButtonWithLoader
                  isLoading={isLoading}
                  className="btn-primary flex py-2 justify-center items-center"
                  onClick={handleSave}
                >
                  Save
                </ButtonWithLoader>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={
                    editor.isActive("bold")
                      ? "editor-control-active"
                      : "editor-control"
                  }
                >
                  <strong>B</strong>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={
                    editor.isActive("italic")
                      ? "editor-control-active"
                      : "editor-control"
                  }
                >
                  <em>i</em>
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={
                    editor.isActive("bulletList")
                      ? "editor-control-active"
                      : "editor-control"
                  }
                >
                  <AiOutlineUnorderedList />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={
                    editor.isActive("orderedList")
                      ? "editor-control-active"
                      : "editor-control"
                  }
                >
                  <AiOutlineOrderedList />
                </button>
              </div>
            </div>
          )}
          <EditorContent editor={editor} />
          {editor && (
            <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 })
                    ? "editor-control-active"
                    : "editor-control"
                }
              >
                h1
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 })
                    ? "editor-control-active"
                    : "editor-control"
                }
              >
                h2
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive("heading", { level: 3 })
                    ? "editor-control-active"
                    : "editor-control"
                }
              >
                h3
              </button>
            </FloatingMenu>
          )}
        </div>
      </div>
    </div>
  );
};
