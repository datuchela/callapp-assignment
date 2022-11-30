import Koa from "koa";
import fs from "fs";
import util from "util";

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

app.use(async (ctx) => {
  const dataBuffer = await readFile("./src/data.json", "utf-8");
  const data: DataType[] = JSON.parse(dataBuffer);
  ctx.body = data;
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
