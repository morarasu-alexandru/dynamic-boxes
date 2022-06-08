import fastify from "fastify";
import { dynamicBoxesService } from "./services/dynamicBoxesService";

const server = fastify();
server.register(require("fastify-websocket"));

server.get("/ping", async () => {
  return "pong\n";
});

server.listen(8085, (err, address) => {
  console.log("works: ");

  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

// @ts-expect-error
server.get("/", () => {
  return "works";
});

server.get("/boxes", { websocket: true }, dynamicBoxesService);
