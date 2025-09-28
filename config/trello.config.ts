export const TRELLO_CONFIG = {
  apiKey: process.env.TRELLO_API_KEY || '',
  token: process.env.TRELLO_TOKEN || '',
};

if (!TRELLO_CONFIG.apiKey || !TRELLO_CONFIG.token) {
  throw new Error('❌ Faltan TRELLO_API_KEY o TRELLO_TOKEN en .env');
}