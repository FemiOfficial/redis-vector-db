import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env["REDIS_URL"] || "redis://localhost:6379",
});

redisClient
  .connect()
  .then(() => {
    console.log("Redis connected");
  })
  .catch((err) => {
    console.error("Redis error:", err);
  });

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});
