import responsesDataset from "./responses_dataset.json";
import { redisClient } from "../redis/connect";
import {
  getTransformerPipeline,
  embeddingPipelingOptions,
} from "../transformer/pipeline";

export const seed = async () => {
  const pipeLine = await getTransformerPipeline();

  // this is to get the embeddings for the responses
  const documents = await Promise.all(
    responsesDataset.map(async (responseObject: any) => ({
      ...responseObject,
      response_embedding: [
        ...(
          await pipeLine(
            responseObject.response,
            embeddingPipelingOptions
          )
        ).data,
      ],
    }))
  );

  // this is to remove all the existing responses
  await redisClient.del("responses:*");

  // this is to set the responses in redis
  await Promise.all(
    documents.map((doc: any, index: number) =>
      redisClient.json.set(`responses:${index}`, "$", doc)
    )
  );
};
