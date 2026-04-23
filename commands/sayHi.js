const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ola").setDescription("O bot te cumprimenta!"),

  async execute(interaction) {
    const nome = interaction.user.globalName || interaction.user.username;
    await interaction.reply(`Olá, **${nome}**! 👋`);
  },
};
