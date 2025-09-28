import { test, expect } from '@playwright/test';
import { BoardsAPI } from '../../api/resources/BoardsAPI';

test.describe('Boards API', () => {
  let boardsAPI: BoardsAPI;

  test.beforeEach(async ({ request }) => {
    boardsAPI = new BoardsAPI(request);
  });

  test('Crear un board', async () => {
    const board = await boardsAPI.createBoard('Board Playwright');
    expect(board.name).toBe('Board Playwright');
  });

  test('Obtener un board', async () => {
    const newBoard = await boardsAPI.createBoard('Board Temporal');
    const board = await boardsAPI.getBoard(newBoard.id);
    expect(board.id).toBe(newBoard.id);
  });

  test('Eliminar un board', async () => {
    const board = await boardsAPI.createBoard('Board Borrar');
    const deleted = await boardsAPI.deleteBoard(board.id);
    expect(deleted._value).toBeUndefined(); 
  });
});
