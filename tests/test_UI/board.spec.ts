import { test, expect } from "@playwright/test";
import { TrelloDataGenerator } from "../../utils/trelloDataGenerator";
import { DashboardPage } from "../../pages/dashboardPage";
import { DashboardPage as BoardPage } from "../../pages/boardPage";

test.describe("Test For Board", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.gotoDashboard();
  });

  // Array de tipos de archivo para testear
  const fileTypes = [
    { 
      type: 'Image', 
      method: 'addCardFilesImage',
      description: 'Create board and add card with Image file'
    },
    { 
      type: 'JSON', 
      method: 'addCardFilesJson',
      description: 'Create board and add card with JSON file'
    }
  ];

  // Generar un test para cada tipo de archivo
  fileTypes.forEach(({ type, method, description }) => {
    test(description, async ({ page }) => {
      test.setTimeout(60000);

      const boardName = TrelloDataGenerator.generateBoardName();
      const cardName = TrelloDataGenerator.generateCardName();
      
      await test.step("Create board", async () => {
        await dashboardPage.createNewBoard(boardName);
        await page.waitForTimeout(3000);
      });

      const boardPage = new BoardPage(page);

      await test.step('Create lists and card', async () => {
        await boardPage.createList(cardName);
        await boardPage.createCard(cardName);
      });

      await test.step(`Add ${type} File`, async () => {
        await (boardPage as any)[method](cardName);
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

});
