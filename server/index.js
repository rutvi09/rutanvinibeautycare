import "dotenv/config";
import express from "express";
import submissionHandler from "../api/submissions.js";

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(express.json({ limit: "10kb" }));
app.post("/api/submissions", submissionHandler);

app.listen(port, () => {
  console.log(`Submission API server listening on http://localhost:${port}`);
});
