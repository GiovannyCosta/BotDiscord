require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const token = process.env.DISCORD_TOKEN;

const readyHandler = require("./events/ready.js");

// NOVO E CORRETO
client.once("clientReady", () => readyHandler(client));
client.login(token);
