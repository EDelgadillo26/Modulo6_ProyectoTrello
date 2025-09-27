import { test, expect} from "@playwright/test";
import { DashboardPage } from "../pages/dashboardPage";
import { TIMEOUT } from "dns";

test.describe("Test Cases Dashboard", () => {
    let dashboardPage: DashboardPage;
    let createdBoards: string[] = [];

    test.beforeEach(async ({ page }) => {
        dashboardPage = new DashboardPage(page);
        await dashboardPage.gotoDashboard();
    });

    test.afterEach(async ({ page }) => {
        // Cleanup: Delete any boards created during the test
        for (const boardName of createdBoards) {
            try {
                await page.reload(); 
                await dashboardPage.gotoDashboard();
                
                
                // Check if board is visible on dashboard (not closed yet)
                await page.waitForTimeout(5000);
                const isBoardVisible = await dashboardPage.isBoardVisible(boardName);
                
                if (isBoardVisible) {
                    
                    await dashboardPage.openDashboard(boardName);
                    await dashboardPage.deleteBoard();
                } else {
                    await dashboardPage.deleteClosedBoard();
                }
            } catch (error) {
                console.log(`❌ Could not delete board ${boardName}:`, error);
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

    test('should close a board', async ({ page }) => {
        const boardName = "Board to Close";
        createdBoards.push(boardName);
        
        await dashboardPage.createNewBoard(boardName);
        await dashboardPage.closeBoard();
        await dashboardPage.backBoardToDashboard();
        await page.reload(); 
        await dashboardPage.validateVisibilityOfBoard(boardName, false);
    });

    test('should delete a board', async ({ page }) => {
        const boardName = "Board to Delete";        
        await dashboardPage.createNewBoard(boardName);
        await dashboardPage.deleteBoard();
        await dashboardPage.validateVisibilityOfBoard(boardName, false);
    });
        
    test.only('should create a new board', async ({ page }) => {
        const boardName = "New Board";
        createdBoards.push(boardName);
        
        await dashboardPage.createNewBoard(boardName);
        await dashboardPage.backBoardToDashboard();
        await page.reload(); 
        await dashboardPage.validateVisibilityOfBoard(boardName, true);
        
    });
});