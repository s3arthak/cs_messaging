import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";

import Message from "../models/Message.js";
import getUrgency from "./urgency.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_PATH = path.join(
  __dirname,
  "../data/GeneralistRails_Project_MessageData.csv"
);

export async function importCsv() {
 console.log("CSV import started"); 
  const messages = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on("data", (row) => {
        messages.push({
          userId: Number(row["User ID"]),
          timestamp: new Date(row["Timestamp (UTC)"]),
          body: row["Message Body"],
          urgency: getUrgency(row["Message Body"])
        });
      })
      .on("end", async () => {
        console.log("Total rows:", messages.length);
        await Message.insertMany(messages, { ordered: false });
        console.log(`Imported ${messages.length} messages`);
        resolve();
      })
      .on("error", reject);
  });
}
