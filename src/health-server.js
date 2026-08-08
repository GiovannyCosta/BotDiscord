const http = require("node:http");

function createHealthServer({ port, isReady }) {
  const server = http.createServer((request, response) => {
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("X-Content-Type-Options", "nosniff");
    if (request.method !== "GET" || request.url !== "/health") {
      response.writeHead(404);
      return response.end(JSON.stringify({ status: "not_found" }));
    }
    const ready = isReady();
    response.writeHead(ready ? 200 : 503);
    return response.end(JSON.stringify({ status: ready ? "ok" : "starting" }));
  });
  // Limites curtos reduzem conexões ociosas contra um endpoint que só informa saúde.
  server.requestTimeout = 5_000;
  server.headersTimeout = 6_000;
  server.listen(port, "0.0.0.0", () => console.log(`Health check disponível na porta ${port}.`));
  return server;
}

module.exports = { createHealthServer };
