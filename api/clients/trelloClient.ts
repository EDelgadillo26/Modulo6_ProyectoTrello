import { APIRequestContext } from '@playwright/test';

export class TrelloClient {
  constructor(private request: APIRequestContext) {}

  protected async get(endpoint: string, params: any = {}) {
    return this.request.get(endpoint, {
      params: { ...params, key: process.env.TRELLO_KEY, token: process.env.TRELLO_TOKEN }
    });
  }

  protected async post(endpoint: string, data: any = {}) {
    return this.request.post(endpoint, {
      params: { key: process.env.TRELLO_KEY ?? '', token: process.env.TRELLO_TOKEN ?? '' },
      data
    });
  }

  protected async delete(endpoint: string, params: any = {}) {
    return this.request.delete(endpoint, {
      params: { ...params, key: process.env.TRELLO_KEY, token: process.env.TRELLO_TOKEN }
    });
  }
}
