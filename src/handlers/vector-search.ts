import { redisClient } from "../redis/connect";
import {
  getTransformerPipeline,
  embeddingPipelingOptions,
} from "../transformer/pipeline";

const __RESPONSES_INDEX__ = "responses_idx";

export const vectorSearch = async (query: string): Promise<any> => {
  const pipe = await getTransformerPipeline();

  const queryEmbedding: any = (await pipe(query, embeddingPipelingOptions)).data;

  const searchResults = await redisClient.ft.search(
    __RESPONSES_INDEX__,
    "*=>[KNN 3 @response_embedding $QUERY_EMBEDDING AS score]",
    {
      PARAMS: {
        QUERY_EMBEDDING: Buffer.from(queryEmbedding.buffer),
      },
      RETURN: [
        "score",
        "$.question",
        "$.response",
        "$.policy_tag",
        "$.responsible_individuals",
        "$.relevant_document_names",
      ],
      DIALECT: 2,
    }
  );
  return searchResults;
};
