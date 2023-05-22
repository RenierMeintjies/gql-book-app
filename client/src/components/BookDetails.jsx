import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../queries/queries.js";

export default function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(GET_BOOK, { variables: { id: bookId } });

  if (loading || !data || !data.book || !data.book.author || !data.book.author.books.length > 0) return null;
  if (error) return <p>{error}</p>;

  const book = data.book;

  if (!book) return null;

  const RenderAllBooksByAuthor = () => {
    return book.author.books.map((book) => <li key={book.id}>{book.name}</li>);
  };

  return (
    <div className="h-full w-full bg-blue-400 text-slate-100">
      <h1 className="text-lg text-slate-900">Book Details:</h1>
      <h2>Book Name: {book.name}</h2>
      <p>Genre: {book.genre}</p>
      <p>Author: {book.author.name}</p>
      <p className="text-lg text-slate-900">All books by this author:</p>
      <ul key={book.id}>{RenderAllBooksByAuthor()}</ul>
    </div>
  );
}
