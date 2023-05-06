import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_AUTHORS } from "../queries/queries";

export default function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorIdname, setAuthorIdName] = useState("");

  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const resetFormState = () => {
    setName("");
    setGenre("");
    setAuthorIdName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, genre, authorIdname);
    resetFormState();
  };

  const RenderAuthors = () => {
    return data.authors.map((author) => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  return (
    <>
      <form className="flex w-[30%] flex-col" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          Book Name:
          <input
            className="rounded border-2 border-slate-500"
            type="text"
            placeholder="Enter Book Name"
            onChange={(e) => setName({ name: e.target.value })}
          />
        </label>
        <label className="flex flex-col">
          Genre:
          <input
            className="rounded border-2 border-slate-500"
            type="text"
            placeholder="Enter Genre"
            onChange={(e) => setGenre({ genre: e.target.value })}
          />
        </label>
        <label className="flex flex-col">
          Author:
          <select
            className="rounded border-2 border-slate-500"
            onChange={(e) => setAuthorIdName({ authorIdname: e.target.value })}
          >
            <option>Select Author</option>
            <RenderAuthors />
          </select>
        </label>
        <button className="my-2 rounded border-2 border-slate-500 bg-slate-400 p-1 text-white" type="submit">
          Add Book
        </button>
      </form>
    </>
  );
}
