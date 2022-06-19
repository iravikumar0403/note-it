import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonWithLoader, Navbar, Sidebar } from "../components";
import { AiOutlineUnorderedList, AiOutlineOrderedList } from "react-icons/ai";
import { useEditor, EditorContent, FloatingMenu } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { toast } from "react-toastify";
import { addNewNote, updateNote } from "../services";
import { useNotesContext } from "../context";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const NoteEditor = () => {
  const navigate = useNavigate();
  const { folders, getNoteById } = useNotesContext();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(folders[0].id);
  const { id } = useParams();

  useDocumentTitle(id ? "Edit Note / Note It" : "New Note / Note It");
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

  useEffect(() => {
    if (id) {
      const note = getNoteById(id);
      if (note) {
        setTitle(note.title);
        setSelectedFolder(note.folder_id);
        editor?.commands.setContent(note.content);
      } else {
        navigate("/dashboard/notes");
      }
    }
  }, [editor, getNoteById, id, navigate]);

  const handleSave = async () => {
    if (title === "") {
      toast.error("Please enter the note title");
      return;
    }
    if (editor) {
      setIsLoading(true);
      const content = editor.getJSON();
      const text_content = editor.getText();
      try {
        const noteData = {
          title,
          content,
          text_content,
          tags: [] as string[],
          folder_id: selectedFolder,
        };
        if (id) {
          await updateNote(noteData, id);
        } else {
          await addNewNote(noteData);
        }
        navigate("/dashboard/notes");
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto grid grid-cols-12 md:px-4">
        <div className=" col-span-3 hidden md:block">
          <Sidebar />
        </div>
        <div className="col-start-1 md:col-start-4 col-end-13">
          <div className="flex items-center my-2">
            <button
              className="btn-secondary py-2 ml-2"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <div className="flex items-center ml-auto mr-2">
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
          </div>
          <div className="editor m-2">
            <textarea
              className="border-2 rounded w-full p-2 text-lg resize-none"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            <div className="tiptap-editor">
              {editor && (
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
      </div>
    </div>
  );
};
