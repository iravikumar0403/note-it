import { Navbar, RichTextEditor } from "../components";

export const CreateNewNote = () => {
  return (
    <div>
      <Navbar />
      <div className="editor m-2">
        <textarea
          className="border-2 rounded w-full p-2 text-lg"
          placeholder="Document title"
        ></textarea>
        <RichTextEditor />
      </div>
    </div>
  );
};
