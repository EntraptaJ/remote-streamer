// client/src/index.ts
import { DocumentNode } from 'graphql';
import { Readable } from 'stream';
import { initApollo } from './initApollo';

export interface CreateReadableStream {
  gql: DocumentNode;
  host: string;
  variables: any;
}

export async function createReadableStream({
  host,
  gql,
  variables
}: CreateReadableStream): Promise<Readable> {
  const readStream = new Readable({
    read() {}
  });

  const client = initApollo({ URL: host });

  client.subscribe({ query: gql, variables }).subscribe({
    next({ data: { subscribe } }) {
      readStream.push(Buffer.from(subscribe, 'base64'));
    },
    complete() {
      readStream.destroy();
    }
  });

  return readStream;
}
