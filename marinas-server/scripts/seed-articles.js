// Usage: npm run seed:articles
// Upserts the Field Notes seed into MongoDB, matched by slug (`name`). Safe to run again.
require("dotenv").config();
const mongoose = require("mongoose");
const Article = require("../models/Article");
const seed = require("./article-seed-data");

const main = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set. Add it to marinas-server/.env");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);

  let created = 0;
  let updated = 0;
  for (const article of seed) {
    const result = await Article.updateOne(
      { name: article.name },
      { $set: article },
      { upsert: true, runValidators: true },
    );
    if (result.upsertedCount) created += 1;
    else if (result.modifiedCount) updated += 1;
  }
  const total = await Article.countDocuments();
  console.log(`Articles: ${created} created, ${updated} updated, ${total} in the database`);
  await mongoose.disconnect();
};

main().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
