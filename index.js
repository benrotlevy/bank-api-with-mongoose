import { app } from "./server/app.js";
import "./server/db/mongoose.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 5000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirectoryPath = path.join(__dirname, "client/build");

// app.use(cors());
// app.use(express.json());
app.use(express.static(publicDirectoryPath));

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
