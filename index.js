require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

// novo loader para comandos de mensagens
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
// Coleta todos os comandos da pasta /commands
client.commands = new Collection();
const cmdPath = path.join(__dirname, "commands");
const cmdFiles = fs.readdirSync(cmdPath).filter((file) => file.endsWith(".js"));

const cmdsData = [];
for (const file of cmdFiles) {
  const cmd = require(path.join(cmdPath, file));
  client.commands.set(cmd.data.name, cmd);
  cmdsData.push(cmd.data.toJSON());
}

// Registra no Discord quando o bot liga
client.once("clientReady", async () => {
  const rest = new REST().setToken(process.env.DISCORD_TOKEN);
  await rest.put(Routes.applicationCommands(client.user.id), { body: cmdsData });
  console.log("Comandos registrados!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = client.commands.get(interaction.commandName);
  if (cmd) await cmd.execute(interaction);
});

const token = process.env.DISCORD_TOKEN;
const readyHandler = require("./events/ready.js");

// NOVO E CORRETO
client.once("clientReady", () => readyHandler(client));
client.login(token);
