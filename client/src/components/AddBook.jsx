import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK } from "../queries/queries";

export default function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setauthorId] = useState("");

  const { data, loading, error } = useQuery(GET_AUTHORS);
  const [mutateFunction] = useMutation(ADD_BOOK);
  // const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // const clearInputState = () => {
  //   setName("");
  //   setGenre("");
  //   setauthorId("");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutateFunction({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
    });
    alert("Book Added Successfully");
    // clearInputState();
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
      <form className="flex w-80  flex-col" onSubmit={handleSubmit}>
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
            onChange={(e) => setauthorId({ authorId: e.target.value })}
          >
            <option>Select Author</option>
            {RenderAuthors()}
          </select>
        </label>
        <button
          className="my-2 w-20 rounded border-2 border-slate-500 bg-slate-400 py-1 text-white"
          type="submit"
        >
          Add Book
        </button>
      </form>
    </>
  );
}
