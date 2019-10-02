// Lab/src/Modules/FileReader/FileReaderResovler.ts
import { createReadStream } from 'fs';
import { Arg, Query, Resolver, Root, Subscription } from 'type-graphql';
import { createWriteStream } from '../../../../../server/src/writeStream';

@Resolver()
export class FileReaderResovler {
  @Query(() => String)
  async helloWorld(): Promise<string> {
    return 'helloWorld';
  }

  @Subscription({
    // @ts-ignore
    subscribe: async (stuff, args) => {
      const { iterable, writeStream } = await createWriteStream();
      const streamer = createReadStream(args.path);
      streamer.pipe(
        writeStream,
        { end: true }
      );

      return iterable;
    }
  })
  subscribe(@Arg('path') path: string, @Root() stuff: Buffer): string {
    return stuff.toString('');
  }
}
