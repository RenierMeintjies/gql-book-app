import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { typeDefs, resolvers } from "./schema/schema.js";

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(cors({ origin: "*" }), bodyParser.json(), expressMiddleware(server));

mongoose.connect("mongodb://localhost/books", {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 5000 }, resolve));

console.log(`🚀 Server ready at http://localhost:5000/`);
