import axios from 'axios';
import { TRELLO_CONFIG } from '../../config/trello.config';

const trelloApi = axios.create({
  baseURL: 'https://api.trello.com/1',
  params: {
    key: TRELLO_CONFIG.apiKey,
    token: TRELLO_CONFIG.token,
  },
  headers: {
    'User-Agent': 'TrelloTestAutomation/1.0',
  },
});

export default trelloApi;