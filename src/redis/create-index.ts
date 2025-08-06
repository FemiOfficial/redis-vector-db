import { redisClient } from "./connect";
import { responsesIndex, __RESPONSES_INDEX__ } from "./search-schema";

export const createVectorIndex = async () => {
  try {
    await redisClient.ft.dropIndex(__RESPONSES_INDEX__);
    console.log("dropped index successfully");
  } catch (error) {
    console.log("index does not exist, creating new one");
  }

  try {
    await redisClient.ft.create(__RESPONSES_INDEX__, responsesIndex, {
      ON: "JSON",
      PREFIX: "responses:",
    });
    console.log("created index successfully");
  } catch (error) {
    console.log("index creation error:", error);
    throw error;
  }
};
