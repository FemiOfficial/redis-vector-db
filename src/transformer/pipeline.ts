import { FeatureExtractionPipelineOptions, pipeline } from "@xenova/transformers";

export const getTransformerPipeline = async () =>
  await pipeline("feature-extraction", "Xenova/all-distilroberta-v1");

export const embeddingPipelingOptions: FeatureExtractionPipelineOptions = {
  pooling: "mean",
  normalize: true,
};
