const DISCORD_ID_PATTERN = /^\d{17,20}$/;

function optionalDiscordId(environment, name) {
  const value = environment[name]?.trim();
  if (!value) return undefined;
  if (!DISCORD_ID_PATTERN.test(value)) throw new Error(`${name} deve ser um ID válido do Discord.`);
  return value;
}

function loadConfig(environment) {
  const discordToken = environment.DISCORD_TOKEN?.trim();
  if (!discordToken) throw new Error("DISCORD_TOKEN é obrigatório.");
  const port = Number(environment.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT deve ser um número inteiro entre 1 e 65535.");
  }
  return Object.freeze({
    discordToken,
    port,
    guildId: optionalDiscordId(environment, "DISCORD_GUILD_ID"),
    voiceChannelId: optionalDiscordId(environment, "DISCORD_VOICE_CHANNEL_ID"),
    statusChannelId: optionalDiscordId(environment, "DISCORD_STATUS_CHANNEL_ID"),
  });
}

module.exports = { loadConfig };
