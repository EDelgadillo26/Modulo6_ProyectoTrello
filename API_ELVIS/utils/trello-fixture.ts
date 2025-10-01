import { test as base, expect, request, APIRequestContext } from '@playwright/test';

type TrelloFixtures = {
  trelloRequest: APIRequestContext;
};

export const test = base.extend<TrelloFixtures>({
  trelloRequest: async ({ baseURL }, use) => {
    if (!baseURL) {
      throw new Error("baseURL no está definido en playwright.config.ts");
    }

    const trello = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        Accept: 'application/json',
      },
    });

    await use(trello);
    await trello.dispose();
  },
});

export { expect };