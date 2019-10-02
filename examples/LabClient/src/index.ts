// LabClient/src/index.ts
import { createWriteStream, createReadStream } from 'fs';
import { parse } from 'path';
import { Testing } from './Test.gen';
import {
  createReadableStream,
  createWritableStream
} from '../../../client/src/index';

async function startLabClient(): Promise<void> {
  const filePath = 'INSERT SERVER PATH HERE';
  const { base } = parse(filePath);
  // const writeStream = createWriteStream(`data/${base}`);
  const readStream = createReadStream('filename.txt');
  const writeStream = await createWritableStream({
    host: 'http://localhost:81/graphql',
    variables: {}
  });

  readStream.pipe(writeStream);

  /*
  const readStream = await createReadableStream({
    host: 'http://localhost:81/graphql',
    gql: Testing,
    variables: {
      filePath
    }
  });

  readStream.pipe(
    writeStream,
    { end: true }
  ); */
}

startLabClient();
