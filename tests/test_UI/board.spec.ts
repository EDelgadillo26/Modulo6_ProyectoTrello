import { test, expect } from "@playwright/test";
import { TrelloDataGenerator } from "../../utils/trelloDataGenerator";
import { DashboardPage } from "../../pages/dashboardPage";
import { DashboardPage as BoardPage } from "../../pages/boardPage";

test.describe("Test File Generation", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.gotoDashboard();
  });

  test("should create board and add card with generated file", async ({page}) => {
    // Reducir el timeout del test específico
    test.setTimeout(60000);

    const boardName = TrelloDataGenerator.generateBoardName();
    const cardName = TrelloDataGenerator.generateCardName();
    await test.step("Create board", async () => {
      await dashboardPage.createNewBoard(boardName);
      await page.waitForTimeout(3000);
    });

    // Create boardPage instance for card operations
    const boardPage = new BoardPage(page);

    await test.step('Create lists and card', async () => {
        await boardPage.createList(cardName);
        await boardPage.createCard(cardName);
    });

    await test.step('Add ImageFile', async () => {
        await boardPage.addCardFilesImage(cardName);
        await page.waitForTimeout(2000);
    });

    await test.step('Validate Uploaded File', async () => {
        await boardPage.validateUploadedFile();
    });

    await test.step('Cleanup board', async () => {
        await dashboardPage.deleteBoard();
    });
    

  });

 test("should create board and add card with generated file JSON", async ({page}) => {
    // Reducir el timeout del test específico
    test.setTimeout(60000);

    const boardName = TrelloDataGenerator.generateBoardName();
    const cardName = TrelloDataGenerator.generateCardName();
    await test.step("Create board", async () => {
      await dashboardPage.createNewBoard(boardName);
      await page.waitForTimeout(3000);
    });

    // Create boardPage instance for card operations
    const boardPage = new BoardPage(page);

    await test.step('Create lists and card', async () => {
        await boardPage.createList(cardName);
        await boardPage.createCard(cardName);
    });

    await test.step('Add ImageFile', async () => {
        await boardPage.addCardFilesJson(cardName);
        await page.waitForTimeout(2000);
    });

    await test.step('Validate Uploaded File', async () => {
        await boardPage.validateUploadedFile();
    });

    await test.step('Cleanup board', async () => {
        await dashboardPage.deleteBoard();
    });
    

  });

});
