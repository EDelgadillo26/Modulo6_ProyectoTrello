import { TrelloClient } from '../clients/trelloClient';

export class BoardsAPI extends TrelloClient {
  async createBoard(name: string) {
    const response = await this.post('/1/boards/', { name });
    return response.json();
  }

  async getBoard(id: string) {
    const response = await this.get(`/1/boards/${id}`);
    return response.json();
  }

  async deleteBoard(id: string) {
    const response = await this.delete(`/1/boards/${id}`);
    return response.json();
  }
}
