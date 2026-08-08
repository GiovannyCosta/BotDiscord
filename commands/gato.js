const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

const CAT_API_URL = "https://cataas.com/cat?json=true";
const CAT_API_HOST = "cataas.com";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gato")
    .setDescription("Mostra uma imagem aleatória de gato."),

  async execute(interaction) {
    await interaction.deferReply();

    // O timeout impede que uma API externa indisponível prenda a execução do comando.
    const response = await fetch(CAT_API_URL, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new Error(`CATAAS respondeu com HTTP ${response.status}.`);

    const data = await response.json();
    const imageUrl = new URL(data.url, `https://${CAT_API_HOST}`);
    if (imageUrl.hostname !== CAT_API_HOST || imageUrl.protocol !== "https:") {
      throw new Error("CATAAS retornou uma URL de imagem inválida.");
    }

    const embed = new EmbedBuilder()
      .setTitle("Gato aleatório")
      .setImage(imageUrl.toString())
      .setColor(0x5865f2)
      .setFooter({ text: "Imagem fornecida por CATAAS" });

    await interaction.editReply({ embeds: [embed] });
  },
};
