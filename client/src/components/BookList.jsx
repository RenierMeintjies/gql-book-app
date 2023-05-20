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
        className="flex flex-col"
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
    <div>
      <ul className="flex w-full flex-row">
        <div className="flex flex-col">{RenderBooks()}</div>
        <BookDetails bookId={selected} />
      </ul>
    </div>
  );
}
