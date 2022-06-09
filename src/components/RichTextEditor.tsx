import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });
  return (
    <div className="tiptap-editor">
      <EditorContent editor={editor} />
    </div>
  );
};
