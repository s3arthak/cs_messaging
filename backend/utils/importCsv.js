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

  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on("data", async (row) => {
        const userId = Number(row["User ID"]);
        const body = row["Message Body"];
        const timestamp = new Date(row["Timestamp (UTC)"]);

        try {
          await Message.updateOne(
            {
              userId,
              body,
              timestamp
            },
            {
              $setOnInsert: {
                userId,
                body,
                urgency: getUrgency(body),
                timestamp
              }
            },
            {
              upsert: true
            }
          );
        } catch (err) {
          // Ignore duplicted
        }
      })
      .on("end", () => {
        console.log("CSV import finished (deduplicated)");
        resolve();
      })
      .on("error", reject);
  });
}
