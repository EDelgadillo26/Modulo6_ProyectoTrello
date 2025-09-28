import { test, expect} from "@playwright/test";
import { DashboardPage } from "../../pages/dashboardPage";
import { TrelloDataGenerator } from "../../utils/trelloDataGenerator";

test.describe("Test Cases Dashboard", () => {
    let dashboardPage: DashboardPage;
    let createdBoards: string[] = [];

    test.beforeEach(async ({ page }) => {
        dashboardPage = new DashboardPage(page);
        await dashboardPage.gotoDashboard();
    });

    test.afterEach(async ({ page }) => {
        if (createdBoards.length === 0) {
            console.log('🚀 No boards to clean up - skipping cleanup');
            return; // ⚡ Sale inmediatamente si no hay nada que limpiar
        }
        
        // Cleanup: Delete any boards created during the test
        for (const boardName of createdBoards) {
            try {
                // Check if page is still open
                if (page.isClosed()) {
                    console.log(`⚠️ Page is closed, cannot clean up board: ${boardName}`);
                    continue;
                }
                
                await page.reload(); 
                await dashboardPage.gotoDashboard();
                await page.waitForTimeout(3000);
                
                // Check if board is visible on dashboard (not closed yet)
                const isBoardVisible = await dashboardPage.isBoardVisible(boardName);
                
                if (isBoardVisible) {
                    console.log(`🧹 Cleaning up visible board: ${boardName}`);
                    await dashboardPage.openDashboard(boardName);
                    await dashboardPage.deleteBoard();
                } else {
                    console.log(`🧹 Cleaning up closed board: ${boardName}`);
                    await dashboardPage.deleteClosedBoard();
                }
            } catch (error) {
                console.log(`❌ Could not delete board ${boardName}:`, error);
                // If page is closed, skip fallback
                if (page.isClosed()) {
                    console.log(`⚠️ Page is closed, skipping fallback cleanup for: ${boardName}`);
                    continue;
                }
                
                try {
                    await dashboardPage.gotoDashboard();
                    await dashboardPage.deleteClosedBoard();
                    console.log(`✅ Fallback cleanup succeeded for board: ${boardName}`);
                } catch (fallbackError) {
                    console.log(`❌ Fallback cleanup also failed for ${boardName}:`, fallbackError);
                }
            }
        }
        
        // Clear the array for next test
        createdBoards = [];
    });

    test('should create a new board', async ({ page }) => {
        const boardName = TrelloDataGenerator.generateBoardName();
        createdBoards.push(boardName);
        
        await dashboardPage.createNewBoard(boardName);
        await dashboardPage.backBoardToDashboard();
        await page.reload(); 
        await page.waitForTimeout(5000);
        await dashboardPage.validateVisibilityOfBoard(boardName, true);
        
    });

    test('should close a board', async ({ page }) => {
        const boardName = TrelloDataGenerator.generateBoardName();
        createdBoards.push(boardName);
        
        await dashboardPage.createNewBoard(boardName);
        await dashboardPage.closeBoard();
        // Wait for the close operation to complete
        await page.waitForTimeout(2000);
        await dashboardPage.backBoardToDashboard();
        await page.reload(); 
        await page.waitForTimeout(5000);
        await dashboardPage.validateVisibilityOfBoard(boardName, false);
    });

    test('should delete a board', async ({ page }) => {
        const boardName = TrelloDataGenerator.generateBoardName();
        createdBoards.push(boardName); // Agregamos el board a la lista por si falla
        
        await dashboardPage.createNewBoard(boardName);
        await dashboardPage.deleteBoard();
        await page.waitForTimeout(5000);
        await dashboardPage.validateVisibilityOfBoard(boardName, false);
        
        // Si llegamos aquí, el board se eliminó correctamente, lo quitamos de la lista
        const index = createdBoards.indexOf(boardName);
        if (index > -1) {
            createdBoards.splice(index, 1);
        }
    });
        

});