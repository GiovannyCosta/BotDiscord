const test = require("node:test");
const assert = require("node:assert/strict");
const { loadConfig } = require("../src/config");

test("carrega a configuração mínima", () => {
  const config = loadConfig({ DISCORD_TOKEN: "parte1.parte2.parte3", PORT: "4000" });
  assert.equal(config.port, 4000);
  assert.equal(config.discordToken, "parte1.parte2.parte3");
});

test("recusa token ausente", () => assert.throws(() => loadConfig({}), /DISCORD_TOKEN/));

test("recusa porta e IDs inválidos", () => {
  const validToken = "parte1.parte2.parte3";
  assert.throws(() => loadConfig({ DISCORD_TOKEN: validToken, PORT: "70000" }), /PORT/);
  assert.throws(() => loadConfig({ DISCORD_TOKEN: validToken, DISCORD_GUILD_ID: "inválido" }), /DISCORD_GUILD_ID/);
});

test("recusa token com formato inválido", () => {
  assert.throws(() => loadConfig({ DISCORD_TOKEN: "token-incompleto" }), /formato esperado/);
});
