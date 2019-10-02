// LabClient/src/index.ts
import { createWriteStream } from 'fs';
import { parse } from 'path';
import { Testing } from './Test.gen';
import { createReadableStream } from '../../../client/src/index';

async function startLabClient(): Promise<void> {
  const filePath = 'INSERT SERVER PATH HERE';
  const { base } = parse(filePath);
  const writeStream = createWriteStream(`data/${base}`);

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
  );
}

startLabClient();
