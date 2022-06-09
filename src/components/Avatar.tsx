import { useUserContext } from "../context/user-context";

export const Avatar = () => {
  const { user } = useUserContext();

  const name = user?.username || "";
  const numberOfWordsInName = name.split(" ").length;
  const initials =
    numberOfWordsInName === 1
      ? name.substring(0, 2).toUpperCase()
      : name.split(" ")[0].charAt(0).toUpperCase() +
        name.split(" ")[1].charAt(0).toUpperCase();

  return (
    <div className="flex border-0 outline-none bg-green-400 rounded-full h-10 w-10">
      <p className="m-auto">{initials}</p>
    </div>
  );
};
