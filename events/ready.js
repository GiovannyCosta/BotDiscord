const {
  joinVoiceChannel,
  VoiceConnectionStatus,
  entersState,
} = require("@discordjs/voice");

module.exports = async client => {
  console.log(`Logado com sucesso como ${client.user.tag}!`);
  console.log(`O bot está online e pronto para uso.`);

  const GUILD_ID = "1244713478397362307";
  const CHANNEL_ID = "1416956618272407672";
  const ADS_CHANNEL_ID = "1428476081089806346";

  try {
    const ads_channel = await client.channels.fetch(ADS_CHANNEL_ID);
    if (ads_channel && ads_channel.isTextBased()) {
      await ads_channel.send("O bot está online e pronto para uso.");

    } else {
      console.log(
        `Aviso: Não foi possível encontrar o canal de status (ID: ${ADS_CHANNEL_ID}).`
      );
    }
  } catch (error) {
    console.error(
      'Erro ao tentar enviar a mensagem de status "online":',
      error
    );
  }

  try {
    const channel = await client.channels.fetch(CHANNEL_ID);

    if (!channel || !channel.isVoiceBased()) {
      console.log(
        `Erro: Canal de voz com ID ${CHANNEL_ID} não encontrado ou não é um canal de voz.`
      );
      return;
    }

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    connection.on(VoiceConnectionStatus.Ready, () => {
      console.log(`Conectado com sucesso ao canal de voz: ${channel.name}`);
    });

    connection.on(VoiceConnectionStatus.Disconnected, async () => {
      console.log("Bot foi desconectado do canal de voz.");
    });
  } catch (error) {
    console.error(`Erro ao tentar entrar no canal de voz: ${error.message}`);
    console.error(error);
  }
};
