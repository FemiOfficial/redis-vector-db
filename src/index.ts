import { vectorSearch } from "./handlers/vector-search";
import { seed } from "./seed";
import { createVectorIndex } from "./redis/create-index";
import { redisClient } from "./redis/connect";
import { askQuestion, rl } from "./handlers/ask-question";

(async () => {
  // Clear all existing data first
  await redisClient.del("responses:*");
  console.log("Cleared existing data");

  await createVectorIndex();

  await seed();

  const query = await askQuestion("Enter your search query: ");

  if (!query.trim()) {
    console.log("No query provided");
    await redisClient.quit();
    rl.close();
    process.exit(1);
  }

  const searchResults = await vectorSearch(query);
  console.log(`${query}\n\n`);
  console.log("------------ QUERY RESULTS --------------------\n\n");
  const sortedResult = searchResults.documents.sort(
    (a, b) => a.value.score - b.value.score
  );
  for (const result of sortedResult) {
    const resultValue = result.value;

    console.log(
      `${resultValue["$.response"]}\n\nPolicy Tag: ${resultValue["$.policy_tag"]} \n\nSimilarity Distance: ${resultValue["score"]}\n\nManagers: ${resultValue["$.responsible_individuals"]}\n\nRelevant Documents: ${resultValue["$.relevant_document_names"]}`
    );
    console.log("--------------------------------\n\n");
  }

  await redisClient.quit();
  rl.close();
  process.exit(0);
})();
