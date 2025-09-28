import {test, expect} from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.TRELLO_API_KEY ?? '';
const TOKEN = process.env.TRELLO_TOKEN ?? '';

if (!API_KEY || !TOKEN) {
  throw new Error('TRELLO_API_KEY and TRELLO_TOKEN must be set in environment variables');
}

const BASE_URL = 'https://api.trello.com/1';

test.describe('Trello API - Create Board', () => {
  let boardId: string;

  test('should create a board and validate response', async ({ request }) => {
    // Crear el tablero
    const response = await request.post(`${BASE_URL}/boards`, {
      params: { key: API_KEY, token: TOKEN },
      data: {
        name: 'New Board',
      },
    });

    // Validar status 200
    expect(response.status()).toBe(200);

    const jsonData = await response.json();

    // Guardar boardId (opcional, para usar en otros tests)
    boardId = jsonData.id;

    // Validar nombre
    expect(jsonData.name).toBe('New Board');

    // Validar que exista el ID
    expect(jsonData).toHaveProperty('id');
    expect(jsonData.id).toBeTruthy();
    expect(jsonData.id).not.toBe('');

    // Opcional: imprimir el ID
    console.log('Board created with ID:', boardId);
  });
});