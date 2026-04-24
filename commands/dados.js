const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dados")
    .setDescription("Joga dois dados de 6 lados: um para você e um para o bot!"),
  async execute(interaction) {
    const dadoUsuario = Math.floor(Math.random() * 6) + 1;
    const dadoBot = Math.floor(Math.random() * 6) + 1;
    let mensage = "";
    let result = "";

    if (dadoUsuario > dadoBot) {
      mensage = `Voce tirou ${dadoUsuario} e eu tirei ${dadoBot}.`;
      result = `🏆 **Você ganhou!** Eu tirei ${dadoBot} e você tirou ${dadoUsuario}.`;
    } else if (dadoBot > dadoUsuario) {
      result = `💀 **Eu ganhei!** Eu tirei ${dadoBot} e você tirou ${dadoUsuario}. Tente na próxima!`;
    } else {
      result = `🤝 **Empate!** Ambos tiramos ${dadoUsuario}.`;
    }

    await interaction.reply({
      content: `${mensage}\n${result}`,
    });
  },
};
