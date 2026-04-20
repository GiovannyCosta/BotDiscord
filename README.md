#  Discord Voice & Status Bot

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Discord.js](https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white)

Um bot simples para Discord desenvolvido em Node.js. Este bot entra automaticamente num canal de voz predefinido assim que é iniciado e envia uma mensagem de status "online" num canal de texto específico.

## ✨ Funcionalidades

- **Auto-Join em Canal de Voz:** Conecta-se automaticamente a um canal de voz definido através do seu ID usando a biblioteca `@discordjs/voice`.
- **Aviso de Status:** Envia automaticamente uma mensagem indicando que está pronto num canal de texto configurado assim que a aplicação arranca.
- **Modularidade Básica:** Lógica do evento "ready" separada do ficheiro principal (`index.js`), o que ajuda na organização do código e na futura adição de novos comandos ou eventos.

## 🚀 Tecnologias e Dependências

O projeto utiliza as seguintes tecnologias:

- [Node.js](https://nodejs.org/)
- `discord.js`: Para a comunicação base com a API do Discord e gestão de Intents (Guilds, Messages, Voice States, etc.).
- `@discordjs/voice`: Extensão oficial para gerir a conexão do bot a canais de voz.
- `dotenv`: Para o carregamento seguro da variável de ambiente com a chave secreta do bot.

## 🛠️ Como Instalar e Configurar

### Pré-requisitos

- Ter o Node.js instalado na máquina.
- Um Bot criado e configurado no [Discord Developer Portal](https://discord.com/developers/applications) com as intents adequadas ativadas (Message Content, Guild Voice States, Guilds, etc.).

### 1. Preparar as Dependências

Na pasta raiz do projeto, instale as bibliotecas necessárias através do terminal:

```bash
npm install discord.js @discordjs/voice dotenv
```
