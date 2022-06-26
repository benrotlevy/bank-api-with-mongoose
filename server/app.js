import express from "express";
import { usersRoute } from "./routes/users.routes.js";
import { manage } from "./routes/manage.routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", usersRoute);
app.use("/manage", manage);

export { app };
