import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Navigate, useParams } from "react-router-dom";
import { EditNoteFAB, Loader, Navbar } from "../components";
import { useNotesContext } from "../context";

export const ViewNote = () => {
  const { id } = useParams();
  const { getNoteById } = useNotesContext();

  const editor = useEditor({
    extensions: [StarterKit],
    content: null,
    editable: false,
  });

  if (!id) {
    return <Navigate to="/dashboard" />;
  }

  const note = getNoteById(id);

  if (editor && note && editor.getText().trim() === "") {
    editor.commands.setContent(note.content);
  }

  if (!note) {
    return (
      <>
        <Navbar />

        <Loader />
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <div>
        <h2 className="text-2xl font-semibold text-center underline mt-4 py-2 ">
          {note.title}
        </h2>
        <div className="flex flex-wrap justify-center">
          {note.tags.map((tag, index) => (
            <p
              key={index}
              className="rounded-full px-4 py-1 my-2 mr-1 bg-slate-200"
            >
              {tag}
            </p>
          ))}
        </div>
        <div className="tiptap-editor p-4 text-justify sm:m-4">
          {editor && <EditorContent editor={editor} />}
        </div>
      </div>
      <EditNoteFAB />
    </div>
  );
};
