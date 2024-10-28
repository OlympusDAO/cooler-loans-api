import express from "express";

import { handleGet } from "../index";

const app = express();
const port = 3000;

app.get("/", async (req: express.Request, res: express.Response) => {
  await handleGet(req, res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
