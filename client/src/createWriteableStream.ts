// client/src/createWriteableStream.ts
import { Writable } from 'stream';
import { initApollo } from './initApollo';
import gql from 'graphql-tag';

export interface CreateWritableStream {
  host: string;
  variables: any;
}

interface ServerWritableStream {
  id: number;
}

export async function createWritableStream({
  host,
  variables
}: CreateWritableStream): Promise<Writable> {
  const client = initApollo({ URL: host });

  const writableStream = await client.mutate<
    { createWriteStream: ServerWritableStream },
    { filePath: string }
  >({
    mutation: gql`
      mutation createWriteStream($filePath: String!) {
        createWriteStream(filePath: $filePath) {
          id
        }
      }
    `,
    variables: { filePath: 'testing.txt' }
  });

  const writeStream = new Writable({
    write(chunk, encoding, next) {
      client.mutate({
        mutation: gql`
          mutation PushWriteStream($Id: Float!, $chunk: String!) {
            pushWriteStream(Id: $Id, chunk: $chunk)
          }
        `,
        variables: {
          Id: writableStream.data.createWriteStream.id,
          chunk: chunk.toString('base64')
        }
      });
    }
  });

  return writeStream;
}
