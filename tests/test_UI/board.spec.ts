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


    test('should create board and add card with generated file', async ({ page }) => {
        // Reducir el timeout del test específico
        test.setTimeout(60000);
        
        const boardName = TrelloDataGenerator.generateBoardName();
        const cardName = TrelloDataGenerator.generateCardName();

        console.log(`🎯 Creating board: ${boardName}`);
        console.log(`🎯 Creating card: ${cardName}`);

        
        await dashboardPage.createNewBoard(boardName);
        await page.waitForTimeout(3000); 
        
        // Create boardPage instance for card operations
        const boardPage = new BoardPage(page);
        
        console.log(`📋 Creating lists...`);
        await boardPage.createList(cardName);
        
        console.log(`📝 Creating card...`);
        await boardPage.createCard(cardName);
        
        console.log(`📎 Adding file to card...`);
        await boardPage.addCardFiles(cardName);
        
        console.log('✅ Successfully uploaded file to card!');
        await page.waitForTimeout(2000);
        await boardPage.validateUploadedFile();
        await dashboardPage.deleteBoard();
    });
});