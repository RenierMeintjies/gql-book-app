import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../queries/queries";

export default function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setauthorId] = useState("");

  const { data, loading, error } = useQuery(GET_AUTHORS);
  const [mutateFunction] = useMutation(ADD_BOOK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const clearInputState = () => {
    setName("");
    setGenre("");
    setauthorId("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !genre || !authorId) return;
    mutateFunction({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
      refetchQueries: [{ query: GET_BOOKS }],
    });
    clearInputState();
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
      <form className="flex  w-80 flex-col" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          Book Name:
          <input
            className="rounded border-2 border-slate-500"
            type="text"
            placeholder="Enter Book Name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          Genre:
          <input
            className="rounded border-2 border-slate-500"
            type="text"
            placeholder="Enter Genre"
            onChange={(e) => setGenre(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          Author:
          <select className="rounded border-2 border-slate-500" onChange={(e) => setauthorId(e.target.value)}>
            <option>Select Author</option>
            {RenderAuthors()}
          </select>
        </label>
        <button className="my-2 w-20 rounded bg-blue-400 py-1 text-white" type="submit">
          Add Book
        </button>
      </form>
    </>
  );
}
