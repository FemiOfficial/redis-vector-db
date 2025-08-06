import {
  RediSearchSchema,
  SCHEMA_FIELD_TYPE,
  SCHEMA_VECTOR_FIELD_ALGORITHM,
} from "redis";

export const __RESPONSES_INDEX__ = "responses_idx";

export const responsesIndex: RediSearchSchema = {
  "$.question": {
    type: SCHEMA_FIELD_TYPE.TEXT,
    AS: "question",
  },
  "$.response": {
    type: SCHEMA_FIELD_TYPE.TEXT,
    AS: "response",
  },
  "$.policy_tag": {
    type: SCHEMA_FIELD_TYPE.TAG,
    AS: "policy_tag",
  },
  "$.response_embedding": {
    type: SCHEMA_FIELD_TYPE.VECTOR,
    TYPE: "FLOAT32",
    ALGORITHM: SCHEMA_VECTOR_FIELD_ALGORITHM.HNSW,
    DISTANCE_METRIC: "L2",
    DIM: 768,
    AS: "response_embedding",
  },
};
