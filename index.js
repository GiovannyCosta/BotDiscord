require("dotenv").config({ quiet: true });

const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { loadConfig } = require("./src/config");
const { loadCommands, registerCommands } = require("./src/commands");
const { createHealthServer } = require("./src/health-server");
const readyHandler = require("./events/ready");

async function start() {
  const config = loadConfig(process.env);
  const client = new Client({
    // Somente os eventos usados pelo bot são solicitados ao Discord.
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
  });

  const { commands, definitions } = loadCommands();
  client.commands = new Collection(commands);
  const healthServer = createHealthServer({ port: config.port, isReady: () => client.isReady() });

  client.once(Events.ClientReady, async (readyClient) => {
    console.log(`Bot conectado como ${readyClient.user.tag}.`);
    try {
      await registerCommands(readyClient, definitions, config);
      await readyHandler(readyClient, config);
    } catch (error) {
      console.error("Falha durante a inicialização do bot:", error);
    }
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Falha no comando ${interaction.commandName}:`, error);
      const response = { content: "Não foi possível executar o comando.", ephemeral: true };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(response).catch(() => undefined);
      } else {
        await interaction.reply(response).catch(() => undefined);
      }
    }
  });

  client.on(Events.Error, (error) => console.error("Erro do cliente Discord:", error));

  const shutdown = (signal) => {
    console.log(`Encerramento solicitado por ${signal}.`);
    healthServer.close();
    client.destroy();
  };
  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));

  try {
    await client.login(config.discordToken);
  } catch (error) {
    // Libera a porta quando o Discord rejeita o login ou a rede está indisponível.
    healthServer.close();
    client.destroy();
    throw error;
  }
}

start().catch((error) => {
  console.error("Não foi possível iniciar a aplicação:", error.message);
  process.exitCode = 1;
});
