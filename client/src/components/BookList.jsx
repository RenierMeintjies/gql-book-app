import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";

export default function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const RenderBooks = () => {
    return data.books.map((book) => (
      <div key={book.id} className="m-5">
        <li>{book.name}</li>
      </div>
    ));
  };

  return <>{RenderBooks()}</>;
}
