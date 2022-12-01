import Koa from "koa";
import cors from "@koa/cors";
import fs from "fs";
import util from "util";
import { config } from "dotenv";

config();

const app = new Koa();

type DataType = {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
};

const readFile = util.promisify(fs.readFile);

app.use(
  cors({
    origin: "*",
  })
);

// Since the only purpose of this server is to respond with data.json,
// this implementation seems fine.
// If we had to go with more than one endpoints or methods,
// then we could have accounted for those too.

app.use(async (ctx) => {
  const dataBuffer = await readFile("./src/data.json", "utf-8");
  const data: DataType[] = JSON.parse(dataBuffer);
  ctx.body = data;
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
