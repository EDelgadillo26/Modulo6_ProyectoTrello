import { test, expect } from '@playwright/test';

test('has title', async ({ request }) => {
  const response = await request.get('/boards/68dac5b0a692d040a4f9df5b', {
    params: {
      key: process.env.API_KEY!,
      token: process.env.API_TOKEN!,
    }
  });

  expect(response.status()).toBe(200);
  const responseBoard = await response.json();
  console.log(responseBoard);

});

test('has title 2', async ({ request }) => {
  const response = await request.get(`/emoji`);

  expect(response.status()).toBe(200);
  const responseBoard = await response.json();
  console.log(responseBoard);
});

test('has title 2 clone', async ({ request, baseURL }) => {
  const response = await request.get(`${baseURL}/emoji`);

  expect(response.status()).toBe(200);
  const responseBoard = await response.json();
  console.log(responseBoard);
});

//const baseURL = "https://api.trello.com/1"

test('has title 3', async ({ request, baseURL }) => {
  const response = await request.get(`${baseURL}/boards/68dac5b0a692d040a4f9df5b`, {
    params: {
      key: process.env.API_KEY!,
      token: process.env.API_TOKEN!,
    }
  });

  expect(response.status()).toBe(200);
  console.log(await response.json());

});