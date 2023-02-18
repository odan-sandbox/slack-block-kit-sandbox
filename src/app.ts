import fastify from "fastify";

const app = fastify({ logger: true });

app.get("/", async (request, reply) => {
  return { hello: "world" };
});

async function main(): Promise<void> {
  app.listen({ port: 3000 });
}

main();

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});
