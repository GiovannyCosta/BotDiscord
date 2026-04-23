require("dotenv").config();
const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const http = require("http"); // Adicionado para o Render

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// --- NOVO: Servidor para o Render não dar erro de porta ---
http
  .createServer((req, res) => {
    res.write("Bot is online!");
    res.end();
  })
  .listen(process.env.PORT || 3000);

client.commands = new Collection();
const cmdPath = path.join(__dirname, "commands");
if (fs.existsSync(cmdPath)) {
  const cmdFiles = fs.readdirSync(cmdPath).filter((file) => file.endsWith(".js"));
  const cmdsData = [];
  for (const file of cmdFiles) {
    const cmd = require(path.join(cmdPath, file));
    client.commands.set(cmd.data.name, cmd);
    cmdsData.push(cmd.data.toJSON());
  }

  // Registra comandos quando o bot estiver pronto
  client.once(Events.ClientReady, async (c) => {
    console.log(`Pronto! Logado como ${c.user.tag}`);
    const rest = new REST().setToken(process.env.DISCORD_TOKEN);
    try {
      await rest.put(Routes.applicationCommands(c.user.id), { body: cmdsData });
      console.log("Comandos registrados com sucesso!");
    } catch (error) {
      console.error(error);
    }
  });
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = client.commands.get(interaction.commandName);
  if (cmd) await cmd.execute(interaction);
});

const readyHandler = require("./events/ready.js");
client.once(Events.ClientReady, () => readyHandler(client));

client.login(process.env.DISCORD_TOKEN);
