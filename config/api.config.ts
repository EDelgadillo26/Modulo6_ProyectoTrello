export const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
export const TRELLO_TOKEN = process.env.TRELLO_TOKEN;

if (!TRELLO_API_KEY || !TRELLO_TOKEN) {
  throw new Error(
    '❌ Faltan credenciales de API. Define TRELLO_API_KEY y TRELLO_TOKEN en .env'
  );
}