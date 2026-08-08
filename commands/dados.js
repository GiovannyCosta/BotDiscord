const { randomInt } = require("node:crypto");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dados")
    .setDescription("Joga dois dados de seis lados: um para você e outro para o bot."),
  async execute(interaction) {
    // randomInt gera os valores inteiros sem adaptar um número de ponto flutuante.
    const userRoll = randomInt(1, 7);
    const botRoll = randomInt(1, 7);
    let result;
    if (userRoll > botRoll) result = "Você ganhou.";
    else if (botRoll > userRoll) result = "Eu ganhei. Tente novamente.";
    else result = "Empate.";
    await interaction.reply(`Você tirou ${userRoll} e eu tirei ${botRoll}. ${result}`);
  },
};
