const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ola").setDescription("O bot cumprimenta você."),
  async execute(interaction) {
    const name = interaction.user.globalName || interaction.user.username;
    await interaction.reply(`Olá, **${name}**!`);
  },
};
