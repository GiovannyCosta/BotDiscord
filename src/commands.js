const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js");

function loadCommands(commandPath = path.join(__dirname, "..", "commands")) {
  const commands = [];
  const definitions = [];
  for (const file of fs.readdirSync(commandPath).filter((name) => name.endsWith(".js"))) {
    const command = require(path.join(commandPath, file));
    if (!command.data?.name || typeof command.execute !== "function") {
      throw new Error(`Comando inválido no arquivo ${file}.`);
    }
    commands.push([command.data.name, command]);
    definitions.push(command.data.toJSON());
  }
  return { commands, definitions };
}

async function registerCommands(client, definitions, config) {
  const rest = new REST().setToken(config.discordToken);
  const route = config.guildId
    ? Routes.applicationGuildCommands(client.user.id, config.guildId)
    : Routes.applicationCommands(client.user.id);
  await rest.put(route, { body: definitions });
  console.log(`${definitions.length} comando(s) registrado(s).`);
}

module.exports = { loadCommands, registerCommands };
