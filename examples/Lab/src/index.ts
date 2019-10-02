// Lab/src/index.ts
import { buildSchema } from 'type-graphql';
import { resolve } from 'path';
import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';

export async function startAPI(): Promise<void> {
  const schema = await buildSchema({
    resolvers: [
      resolve(`${__dirname}/Modules/**/*Resolver.ts`),
      resolve(`${__dirname}/Modules/**/*Resolver.js`)
    ]
  });

  const apiServer = new ApolloServer({ schema });
  await apiServer.listen(81);
}

startAPI();
