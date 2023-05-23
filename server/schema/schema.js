import Book from "../models/book.js";
import Author from "../models/author.js";

// The GraphQL schema
export const typeDefs = `#graphql
type Book {
  id: ID
  name: String
  genre: String
  author: Author
}

type Author {
  id: ID
  name: String
  age: Int
  books: [Book]
}

type Query {
  books: [Book]
  authors: [Author]
  book(id: ID!): Book
  author(id: ID!): Author
}

type Mutation {
   addBook(name: String!, genre: String!, authorId: ID!): Book
   addAuthor(name: String!, age: Int!): Author
}
`;

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    books: async () => {
      return await Book.find({});
    },
    authors: async () => {
      return await Author.find({});
    },
    book: async (parent, args) => {
      return await Book.findById(args.id);
    },
    author: async (parent, args) => {
      return await Author.findById(args.id);
    },
  },

  Author: {
    books: async (parent) => {
      return await Book.find({ authorId: parent.id });
    },
  },

  Book: {
    author: async (parent) => {
      return await Author.findById(parent.authorId);
    },
  },

  Mutation: {
    addBook: async (parent, args) => {
      const book = new Book({
        name: args.name,
        genre: args.genre,
        authorId: args.authorId,
      });
      return await book.save();
    },
    addAuthor: async (parent, args) => {
      const author = new Author({
        name: args.name,
        age: args.age,
      });
      return await author.save();
    },
  },
};
