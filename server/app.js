import express from "express";
import { usersRoute } from "./routes/users.routes.js";
import cors from "cors";
import { manage } from "./routes/manage.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", usersRoute);
app.use("/manage", manage);

export { app };
