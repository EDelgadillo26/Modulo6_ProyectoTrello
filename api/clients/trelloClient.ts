import axios from 'axios';
import { TRELLO_API_KEY, TRELLO_TOKEN } from '../../config/api.config';

const trelloApi = axios.create({
  baseURL: 'https://api.trello.com/1',
  params: {
    key: TRELLO_API_KEY,
    token: TRELLO_TOKEN,
  },
});

export default trelloApi;