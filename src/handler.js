import serverless from "serverless-http";
import express from 'express';
// import  getDbClient  from "./db/client.js";
import { dbclient } from "./db/client.js";
const app = express();
import { getLead, listLeads, newLead } from "./db/crud.js";
import { validateLead } from "./db/validator.js"

app.use(express.json());


app.get("/", async (req, res, next) => {
  try {
    const db = await dbclient();
    const now = Date.now();
    const [result] = await db`select NOW()`
    const delta = (result.now.getTime() - now) / 1000;
    const databasesNames = await db`SELECT current_database();
`;

    return res.status(200).json({
      result: result.now,
      databases: databasesNames,
      delta: delta,
      // message: "Hello from root!",
      // DEBUG: process.env.DEBUG === 1 || `${process.env.DEBUG}` === "1",
      // DATABASE_URL: process.env.DATABASE_URL ? process.env.DATABASE_URL : "Not found",
    });

  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
});

app.get("/leads", async (req, res, next) => {
  const result = await listLeads();
  // const result = await getLead(4);
  return res.status(200).json({
    result: result,
  });
});

app.post("/leads", async (req, res, next) => {
  const postData = await req.body

  const { data, hasError, message } = await validateLead(postData);
  // const {email}  = data
  
  if (hasError === true) {
    return res.status(400).json({
      message: message ? message : "Invalid request. please try again",
    });
  } else if (hasError === undefined) {
    return res.status(500).json({
      message: "Server Error",
    });
  }

  const result = await newLead(data);
  return res.status(201).json({
    result: result,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// this is for a server-full app
// app.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });

// exports.handler = serverless(app);
export const handler = serverless(app);
