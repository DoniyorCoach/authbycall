import express from "express";
import { config } from "dotenv";

config();

import router from "./routes/index.js";

const PORT = (process.env.SERVER_PORT ??= 5000);

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => console.log("Server started on port", PORT));
