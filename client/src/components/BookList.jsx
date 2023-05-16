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
        key={book.id}
        onClick={() => {
          setSelected(book.id);
        }}
        className="m-5"
      >
        {book.name}
      </li>
    ));
  };

  return (
    <div>
      <ul>
        {RenderBooks()}
        <li>
          <BookDetails bookId={selected} />
        </li>
      </ul>
    </div>
  );
}
