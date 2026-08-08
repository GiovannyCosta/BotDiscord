const { joinVoiceChannel, VoiceConnectionStatus } = require("@discordjs/voice");

module.exports = async (client, config) => {
  if (config.statusChannelId) {
    try {
      const statusChannel = await client.channels.fetch(config.statusChannelId);
      if (!statusChannel?.isTextBased()) throw new Error("o canal configurado não aceita mensagens");
      await statusChannel.send("O bot está online e pronto para uso.");
    } catch (error) {
      console.error("Não foi possível publicar o status online:", error.message);
    }
  }

  if (!config.voiceChannelId) return;
  try {
    const channel = await client.channels.fetch(config.voiceChannelId);
    if (!channel?.isVoiceBased()) throw new Error("o canal configurado não é um canal de voz");

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: true,
    });
    connection.on(VoiceConnectionStatus.Ready, () => console.log(`Bot conectado ao canal ${channel.name}.`));
    connection.on(VoiceConnectionStatus.Disconnected, () => console.warn("Bot desconectado do canal de voz."));
    connection.on("error", (error) => console.error("Erro na conexão de voz:", error.message));
  } catch (error) {
    console.error("Não foi possível entrar no canal de voz:", error.message);
  }
};
