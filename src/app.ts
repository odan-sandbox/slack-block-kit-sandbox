import fastify from "fastify";

const app = fastify({ logger: true });

app.get("/", async (request, reply) => {
  return { hello: "world" };
});

app.post("/", (request) => {
  request.log.info(request.body);
  return {};
});

async function main(): Promise<void> {
  app.listen({ port: 3000 });
}

main();

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});
