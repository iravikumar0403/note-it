import { useEditor, FloatingMenu, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";

export const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start typing here</p>",
    editable: true,
  });

  const [folder_id, setFolder] = useState("");
  useEffect(() => {
    (async () => {
      let { data, error, status } = await supabase
        .from("folders")
        .select()
        .single();
      console.log(data, error, status);
      setFolder(data?.id);
    })();
  }, []);

  const handleSave = async () => {
    const title = editor?.getText().split("\n")[0].substring(0, 250);
    const content = editor?.getJSON();
    // content, folder_id, title, tags
    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, content, folder_id, tags: ["test"] }]);

    console.log(data, error);
  };

  return (
    <div className="editor mx-10">
      <button className="editor-control">slgjdjf</button>
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
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive("bulletList")
                ? "editor-control-active"
                : "editor-control"
            }
          >
            bullet list
          </button>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />
      <button className="btn-primary my-4" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};
