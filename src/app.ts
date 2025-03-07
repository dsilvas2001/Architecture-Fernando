import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb/mongo-database";
import { env } from "process";

(async () => {
  await main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoURL: envs.MONGO_URL,
  });

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
