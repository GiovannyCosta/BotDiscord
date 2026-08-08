# Discord Voice & Status Bot

Bot para Discord em Node.js com comandos slash, conexão opcional a canal de voz, aviso de inicialização e endpoint de saúde para hospedagem.

## Início rápido

1. Instale Node.js 20 ou superior.
2. Execute `npm ci`.
3. Copie `.env.example` para `.env` e preencha o token e os IDs desejados.
4. Execute `npm start`.
5. Consulte `GET /health` na porta configurada para verificar a aplicação.

Os comandos disponíveis são `/ola`, `/dados` e `/gato`. Os IDs de canal são opcionais. Se `DISCORD_GUILD_ID` for informado, os comandos são registrados apenas nesse servidor; sem ele, o registro é global.

## Verificação

```bash
npm run check
npm test
```

A documentação técnica e operacional completa é gerada em `docs/`. Por decisão do projeto, essa pasta está no `.gitignore` e não será enviada ao repositório.

Nunca registre `.env` ou tokens do Discord no Git. Se um token for exposto, redefina-o imediatamente no Discord Developer Portal.
