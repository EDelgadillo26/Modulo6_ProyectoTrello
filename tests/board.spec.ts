import { test, expect } from "@playwright/test";
import { TrelloDataGenerator } from "../utils/trelloDataGenerator";
import { DashboardPage } from "../pages/dashboardPage";
import { BoardPage } from "../pages/boardPage";

test.describe("Board Creation Tests", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.gotoDashboard();
  });

  test.afterEach(async ({ page }) => {
    await dashboardPage.deleteBoard();
  });

  test('Create board with lists and basic card', async ({ page }) => {
    test.setTimeout(60000);

    const boardName = TrelloDataGenerator.generateBoardName();
    const cardName = TrelloDataGenerator.generateCardName();
    
    await test.step("Create board", async () => {
      await dashboardPage.createNewBoard(boardName);
      await page.waitForTimeout(3000);
    });

    const boardPage = new BoardPage(page);

    await test.step('Create lists (To Do, In Progress, Done)', async () => {
      await boardPage.createList(cardName);
    });

    await test.step('Create basic card in To Do list', async () => {
      await boardPage.createCard(cardName);
    });

    await test.step('Validate card was created', async () => {
      await expect(page.getByRole('link', { name: cardName })).toBeVisible();
    });
  });

  test('Create multiple cards in different lists', async ({ page }) => {
    test.setTimeout(60000);

    const boardName = TrelloDataGenerator.generateBoardName();
    const cardName1 = TrelloDataGenerator.generateCardName();
    const cardName2 = TrelloDataGenerator.generateCardName();
    const cardName3 = TrelloDataGenerator.generateCardName();
    
    await test.step("Create board", async () => {
      await dashboardPage.createNewBoard(boardName);
      await page.waitForTimeout(3000);
    });

    const boardPage = new BoardPage(page);

    await test.step('Create lists', async () => {
      await boardPage.createList("temp");
    });

    await test.step('Create card in To Do', async () => {
      await boardPage.createCard(cardName1);
    });

    await test.step('Create card in In Progress', async () => {
      await boardPage.createCardInList(cardName2, "In Progress");
    });

    await test.step('Create card in Done', async () => {
      await boardPage.createCardInList(cardName3, "Done");
    });

    await test.step('Validate all cards were created', async () => {
      await expect(page.getByRole('link', { name: cardName1 })).toBeVisible();
      await expect(page.getByRole('link', { name: cardName2 })).toBeVisible();
      await expect(page.getByRole('link', { name: cardName3 })).toBeVisible();
    });

  });
});
