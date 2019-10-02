// examples/Lab/src/Modules/WriteStreams/createWriteStream.ts
import { WriteStream } from './WriteStreamModel';
import { Readable } from 'stream';

export const streams: WriteStream[] = [];

let id = 0;

export function createReadableStream(): WriteStream {
  const readStream = new Readable({
    read() {}
  });

  const stream: WriteStream = { id: id++, readStream };
  streams.push(stream);

  return stream;
}

export function pushToStream(writeId: number, chunk: Buffer): void {
  const { readStream } = streams.find(({ id }) => id === writeId);
  readStream.push(chunk);
}
