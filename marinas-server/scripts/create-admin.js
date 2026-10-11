// Usage: node scripts/create-admin.js <email> <username> <password> <firstName> <lastName>
// Creates an admin user, or updates the existing user with that email/username to admin.
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const main = async () => {
  const [email, username, password, firstName, lastName] = process.argv.slice(2);

  if (!email || !username || !password || !firstName || !lastName) {
    console.error(
      "Usage: node scripts/create-admin.js <email> <username> <password> <firstName> <lastName>",
    );
    process.exit(1);
  }

  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set. Add it to marinas-server/.env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash(password, 10);
  const existing = await User.findOne({ $or: [{ email }, { username }] });

  if (existing) {
    existing.email = email;
    existing.username = username;
    existing.password = hashedPassword;
    existing.firstName = firstName;
    existing.lastName = lastName;
    existing.type = "admin";
    existing.isActive = true;
    await existing.save();
    console.log(`Updated admin: ${email}`);
  } else {
    await User.create({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      type: "admin",
      isActive: true,
      // Placeholders for the other required fields
      age: "N/A",
      gender: "N/A",
      contactNumber: "N/A",
      address: "N/A",
    });
    console.log(`Created admin: ${email}`);
  }

  await mongoose.disconnect();
};

main().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
