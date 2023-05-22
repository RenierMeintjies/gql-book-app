import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";
import BookDetails from "../components/BookDetails";

export default function BookList() {
  const [selected, setSelected] = useState(null);

  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const RenderBooks = () => {
    return data.books.map((book) => (
      <li
        className="m-1 h-fit w-fit border-2 border-blue-400 p-1"
        key={book.id}
        onClick={() => {
          setSelected(book.id);
        }}
      >
        {book.name}
      </li>
    ));
  };

  return (
    <div className="">
      <ul className="flex flex-row">
        <div className="flex h-full w-full flex-row flex-wrap justify-around text-center align-middle">
          {RenderBooks()}
        </div>
        <BookDetails bookId={selected} />
      </ul>
    </div>
  );
}
