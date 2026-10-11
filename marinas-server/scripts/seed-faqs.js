// Usage: npm run seed:faqs
// Upserts the Radyo FAQ seed into MongoDB (matched by question) and writes the same data to
// marinas-client/src/data/faqs.json, which the chatbot uses when the API can't be reached.
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const mongoose = require("mongoose");
const Faq = require("../models/Faq");
const seed = require("./faq-seed-data");

const clientFile = path.join(__dirname, "..", "..", "marinas-client", "src", "data", "faqs.json");

const writeClientCopy = () => {
  const data = seed.map(({ question, answer, keywords, links, order }) => ({ question, answer, keywords, links, order }));
  fs.writeFileSync(clientFile, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Wrote ${path.relative(path.join(__dirname, "..", ".."), clientFile)} (${data.length} FAQs)`);
};

const main = async () => {
  writeClientCopy();

  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set, so only faqs.json was written. Add it to marinas-server/.env");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);

  let created = 0;
  let updated = 0;
  for (const faq of seed) {
    const result = await Faq.updateOne({ question: faq.question }, { $set: faq }, { upsert: true, runValidators: true });
    if (result.upsertedCount) created += 1;
    else if (result.modifiedCount) updated += 1;
  }
  const total = await Faq.countDocuments();
  console.log(`FAQs: ${created} created, ${updated} updated, ${total} in the database`);
  await mongoose.disconnect();
};

main().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
