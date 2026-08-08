const test = require("node:test");
const assert = require("node:assert/strict");
const { loadConfig } = require("../src/config");

test("carrega a configuração mínima", () => {
  const config = loadConfig({ DISCORD_TOKEN: "segredo", PORT: "4000" });
  assert.equal(config.port, 4000);
  assert.equal(config.discordToken, "segredo");
});

test("recusa token ausente", () => assert.throws(() => loadConfig({}), /DISCORD_TOKEN/));

test("recusa porta e IDs inválidos", () => {
  assert.throws(() => loadConfig({ DISCORD_TOKEN: "x", PORT: "70000" }), /PORT/);
  assert.throws(() => loadConfig({ DISCORD_TOKEN: "x", DISCORD_GUILD_ID: "inválido" }), /DISCORD_GUILD_ID/);
});
