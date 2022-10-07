require('dotenv').config();

module.exports = {
  development: {
    dbUrl: process.env.DEVELOPMENT_DB_URL,
    baseUrl: process.env.DEVELOPMENT_BASE_URL,
    smtp: {
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'no.reply.spoint@yandex.kz',
        pass: process.env.DEVELOPMENT_EMAIL_PASSWORD,
      },
    },
    emailSender: 'no.reply.spoint@yandex.kz',
    NCANodeUrl: process.env.DEVELOPMENT_NCA_NODE_URL || 'https://emba-nd.kz/nca-node/',
    frontUrl: process.env.DEVELOPMENT_FRONT_URL || 'https://emba-nd.kz/',
  },
  production: {
    dbUrl: process.env.PRODUCTION_DB_URL,
    baseUrl: process.env.PRODUCTION_BASE_URL,
    smtp: {
      host: process.env.PRODUCTION_SMTP_HOST,
      account: process.env.PRODUCTION_SMTP_ACCOUNT,
      password: process.env.PRODUCTION_SMTP_PASSWORD,
      smtpPort: process.env.PRODUCTION_SMTP_PORT,
      secure: Boolean(process.env.PRODUCTION_SMTP_SECURE),
    },
    NCANodeUrl: process.env.PRODUCTION_NCA_NODE_URL,
    frontUrl: process.env.PRODUCTION_FRONT_URL,
  },
};
