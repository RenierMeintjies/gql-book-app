import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

mongoose.connect("mongodb://localhost/books", {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

/*global process*/
app.listen(process.env.PORT || 5000, () => {
  console.log("server started on http://localhost:5000/graphql");
});
