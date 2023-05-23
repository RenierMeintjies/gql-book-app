import { useState } from "react";
import { GET_AUTHORS, ADD_AUTHOR } from "../queries/queries";
import { useMutation } from "@apollo/client";

export default function AddAuthor() {
  const [name, setName] = useState("");
  const [age, setAge] = useState();

  const [mutateFunction] = useMutation(ADD_AUTHOR);

  const clearInputState = () => {
    setName("");
    setAge();
  };

  const handleSubmitAuthor = (e) => {
    e.preventDefault();
    if (!name || !age) return;
    mutateFunction({
      variables: {
        name: name,
        age: age,
      },
      refetchQueries: [{ query: GET_AUTHORS }],
    });
    clearInputState();
  };

  return (
    <>
      <form className="flex w-80 flex-col" onSubmit={handleSubmitAuthor}>
        <label className="flex flex-col">
          Author Name:
          <input
            className="rounded border-2 border-slate-500"
            type="text"
            placeholder="Enter author Name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          Genre:
          <input
            className="rounded border-2 border-slate-500"
            type="number"
            placeholder="Enter age"
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
        </label>
        <button className="my-2 w-fit rounded bg-blue-400 p-2 text-white" type="submit">
          Add Author
        </button>
      </form>
    </>
  );
}
