import { vectorSearch } from "./handlers/vector-search";
import { seed } from "./seed";
import { createVectorIndex } from "./redis/create-index";
import { redisClient } from "./redis/connect";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

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
      `${resultValue["$.response"]}\n - ${resultValue["$.policy_tag"]} - ${resultValue["score"]}`
    );
    console.log("--------------------------------\n\n");
  }

  await redisClient.quit();
  rl.close();
  process.exit(0);
})();
