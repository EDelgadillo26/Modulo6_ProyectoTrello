import { test, expect } from '@playwright/test';
//import { trelloGet, trelloPost, trelloDelete } from '../utils/trello-api';


test('Crear tablero', async ({ request }) => {
  
  const response = await request.post('/boards', {
    params: {
      key: process.env.API_KEY!,
      token: process.env.API_TOKEN!,
    },
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: {
      name: "Tablero CODE",
    }
  });

  console.log('Status:', response.status());

  console.log('Status:', response.status());
  console.log('Body:', await response.text());

  expect(response.ok()).toBeTruthy();
});