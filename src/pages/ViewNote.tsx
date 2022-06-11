import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar } from "../components";
import { supabase } from "../config/supabaseClient";
import { note } from "../types/notes.types";

export const ViewNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState<note | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .eq("id", id);
      if (data) {
        setNote(data[0]);
      }
      if (error) {
        toast.error(error.message);
      }
    })();
  }, [id]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: null,
  });

  if (editor && note && editor.getText().trim() === "") {
    editor.commands.setContent(note.content);
  }

  if (!note) {
    return <p className="text-center">Loading...</p>;
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
    </div>
  );
};
