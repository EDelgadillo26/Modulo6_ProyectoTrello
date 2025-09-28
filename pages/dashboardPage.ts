import { Page, Locator, expect } from "@playwright/test";
import { config } from "../utils/config";

export class DashboardPage {
  private page: Page;
  
  // Selector complejo para boards en YOUR WORKSPACES (el más importante para refactorizar)
  private readonly yourWorkspacesBoardSelector = 'h3.xtkiiaSp5ulDJM:has-text("YOUR WORKSPACES") ~ * .JeWt7esCgw4_73';

  constructor(page: Page) {
    this.page = page;
  }

  // Helper method to get board selector by name in YOUR WORKSPACES
  private getBoardInWorkspacesSelector(boardName: string): string {
    return `${this.yourWorkspacesBoardSelector} a[title="${boardName}"][aria-label="${boardName}"]`;
  }

  // Helper method to get board link selector by name (generic)
  private getBoardLinkSelector(boardName: string): string {
    return `a[title="${boardName}"]`;
  }

  async gotoDashboard() {
    await this.page.goto(config.urls.dashboard);
  }

  async createNewBoard(boardName: string) {
    await this.page.getByTestId('header-create-menu-button').click();
    await this.page.getByTestId('header-create-board-button').click();
    await this.page.getByTestId('create-board-title-input').click();
    await this.page.getByTestId('create-board-title-input').fill(boardName);
    await this.page.getByTestId('create-board-submit-button').click();
  } 

  async openDashboard(boardName: string) {
    await this.page.locator(this.getBoardLinkSelector(boardName)).first().click();
  }

  // Archive board
  async closeBoard() {
    await this.page.getByRole('button', { name: 'Show menu' }).click();
    await this.page.getByRole('button', { name: 'Close board Close board' }).click();
    await this.page.getByTestId('popover-close-board-confirm').click();
  }

  // Archive and delete board
  async deleteBoard() {
    await this.page.getByRole('button', { name: 'Show menu' }).click();
    await this.page.getByRole('button', { name: 'Close board Close board' }).click();
    await this.page.getByTestId('popover-close-board-confirm').click();
    await this.page.getByRole('button', { name: 'Show menu' }).click();
    await this.page.getByTestId('close-board-delete-board-button').click();
    await this.page.getByTestId('close-board-delete-board-confirm-button').click();
  }

  async deleteClosedBoard() {
    await this.page.getByRole('button', { name: 'View all closed boards' }).click();
    await this.page.getByTestId('close-board-delete-board-button').first().click();
    await this.page.getByTestId('close-board-delete-board-confirm-button').click();
  }

  async validateVisibilityOfBoard(boardName: string, shouldBeVisible: boolean): Promise<void> {
    const boardSelector = this.getBoardInWorkspacesSelector(boardName);
    await this.page.waitForSelector(boardSelector, { state: shouldBeVisible ? 'visible' : 'hidden' });
    const isBoardVisible = await this.page.locator(boardSelector).first().isVisible();
    expect(isBoardVisible).toBe(shouldBeVisible);
  }

  async backBoardToDashboard() {
    await this.page.getByRole('link', { name: 'Back to home' }).click();
  }

  // Method to check if board is visible (without assertions)
  async isBoardVisible(boardName: string): Promise<boolean> {
    try {
      const boardSelector = this.getBoardInWorkspacesSelector(boardName);
      // Use a timeout to avoid waiting too long if element doesn't exist
      await this.page.waitForSelector(boardSelector, { 
        state: 'visible', 
        timeout: 5000 
      });
      return await this.page.locator(boardSelector).first().isVisible();
    } catch (error) {
      // If element is not found or not visible within timeout, return false
      return false;
    }
  }
}