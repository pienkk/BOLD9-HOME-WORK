import express, { NextFunction, Request, Response } from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
dotenv.config();

const startServer = async () => {
  // graphql Schema, resolver 세팅
  const graphqlSchema = makeExecutableSchema({
    typeDefs: [],
    resolvers: [],
  });

  // apollo server 설정
  const apolloServer = new ApolloServer({
    schema: graphqlSchema,
    // Playground 설정
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    introspection: true,
  });

  const app = express();

  // apollo server 시작
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql", cors: { origin: "*" } });

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json("ERR_NOT_FOUND");
  });
  // port 설정
  const options = {
    port: Number(process.env.PORT) || 3000,
  };

  // 서버 시작
  app.listen(options.port, () => {
    console.log(`Server on! Port : ${options.port}`);
  });
};

// 서버 실행
startServer();
