// examples/Lab/src/Modules/WriteStreams/WriteStreamResolver.ts
import { Resolver, Mutation, Arg } from 'type-graphql';
import { WriteStream } from './WriteStreamModel';
import { createReadableStream, pushToStream } from './createReadStream';
import { createWriteStream } from 'fs';

@Resolver(() => WriteStream)
export class WriteStreamResolver {
  @Mutation(() => WriteStream)
  createWriteStream(@Arg('filePath') filePath: string): WriteStream {
    const writeStream = createWriteStream(filePath);
    const stream = createReadableStream();

    stream.readStream.pipe(writeStream);

    return stream;
  }

  @Mutation(() => Boolean)
  pushWriteStream(@Arg('Id') Id: number, @Arg('chunk') chunk: string): boolean {
    pushToStream(Id, Buffer.from(chunk, 'base64'));
    return true;
  }
}
