import express from "express";
import { usersRoute } from "./routes/users.routes.js";
// import cors from "cors";
import { manage } from "./routes/manage.routes.js";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";

const app = express();

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const publicDirectoryPath = path.join(__dirname, "client/build");

// app.use(express.json());
// app.use(cors());
// app.use(express.static(publicDirectoryPath));
app.use("/users", usersRoute);
app.use("/manage", manage);

export { app };
