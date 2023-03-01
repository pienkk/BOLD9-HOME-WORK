import express, { NextFunction, Request, Response } from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLError } from "graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { userTypeDefs } from "./graphql/typeDefs/userTypeDefs";
import { userResolvers } from "./graphql/resolvers/userResolver";
dotenv.config();

/**
 * 서버 생성
 */
const createServer = async () => {
  // graphql Schema, resolver 세팅
  const graphqlSchema = makeExecutableSchema({
    typeDefs: userTypeDefs,
    resolvers: userResolvers,
  });

  const graphqlErrorHandling = (err: GraphQLError) => {
    // 데이터 베이스 에러일 경우 에러 내용을 감춘다
    if (err.message.startsWith("Database Error: ")) {
      return new GraphQLError("Internal server error", {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
        },
      });
    }
    return err;
  };

  // apollo server 설정
  const apolloServer = new ApolloServer({
    schema: graphqlSchema,
    // Playground 설정
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    introspection: true,
    formatError: graphqlErrorHandling,
  });

  const app = express();

  // apollo server 시작
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql", cors: { origin: "*" } });

  // 잘못된 엔드포인트 에러 핸들링
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json("ERR_NOT_FOUND");
  });
  return app;
};

export { createServer };
