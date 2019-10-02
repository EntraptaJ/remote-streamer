// example/Lab/src/Modules/WriteStreams/WriteStreamModel.ts
import { ObjectType, Field, Int } from 'type-graphql';
import { Readable } from 'stream';

@ObjectType()
export class WriteStream {
  @Field(() => Int)
  id: number;

  readStream: Readable;
}
