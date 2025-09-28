import { Page, Locator, expect } from "@playwright/test";
import { config } from "../utils/config";

export class DashboardPage {
  private page: Page;
  
  // ========== SELECTORES DEFINIDOS ==========
  
  // Selectores para boards en workspaces
  private readonly yourWorkspacesBoardSelector = 'h3.xtkiiaSp5ulDJM:has-text("YOUR WORKSPACES") ~ * .JeWt7esCgw4_73';
  
  // Selectores para creación de boards
  private readonly headerCreateMenuButton = 'header-create-menu-button';
  private readonly headerCreateBoardButton = 'header-create-board-button';
  private readonly createBoardTitleInput = 'create-board-title-input';
  private readonly createBoardSubmitButton = 'create-board-submit-button';
  
  // Selectores para menú de boards
  private readonly showMenuButtonName = 'Show menu';
  private readonly closeBoardButtonName = 'Close board Close board';
  private readonly closeBoardConfirmButton = 'popover-close-board-confirm';
  
  // Selectores para eliminar boards
  private readonly deleteBoardButton = 'close-board-delete-board-button';
  private readonly deleteBoardConfirmButton = 'close-board-delete-board-confirm-button';
  private readonly viewAllClosedBoardsButtonName = 'View all closed boards';
  
  // Selectores para navegación
  private readonly backToHomeLinkName = 'Back to home';

  constructor(page: Page) {
    this.page = page;
  }

  private getBoardInWorkspacesSelector(boardName: string): string {
    return `${this.yourWorkspacesBoardSelector} a[title="${boardName}"][aria-label="${boardName}"]`;
  }

  private getBoardLinkSelector(boardName: string): string {
    return `a[title="${boardName}"]`;
  }

  async gotoDashboard() {
    await this.page.goto(config.urls.dashboard);
  }

  async createNewBoard(boardName: string) {
    await this.page.getByTestId(this.headerCreateMenuButton).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByTestId(this.headerCreateMenuButton).click();
    await this.page.getByTestId(this.headerCreateBoardButton).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByTestId(this.headerCreateBoardButton).click();
    await this.page.getByTestId(this.createBoardTitleInput).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByTestId(this.createBoardTitleInput).click();
    await this.page.getByTestId(this.createBoardTitleInput).fill(boardName);
    await this.page.getByTestId(this.createBoardSubmitButton).click();
  } 

  async openDashboard(boardName: string) {
    await this.page.locator(this.getBoardLinkSelector(boardName)).first().click();
  }

  async closeBoard() {
    await this.page.getByRole('button', { name: this.showMenuButtonName }).click();
    await this.page.getByRole('button', { name: this.closeBoardButtonName }).click();
    await this.page.getByTestId(this.closeBoardConfirmButton).click();
  }

  // Archive and delete board
  async deleteBoard() {
    await this.page.getByRole('button', { name: this.showMenuButtonName }).click();
    await this.page.getByRole('button', { name: this.closeBoardButtonName }).click();
    await this.page.getByTestId(this.closeBoardConfirmButton).click();
    await this.page.getByRole('button', { name: this.showMenuButtonName }).click();
    await this.page.getByTestId(this.deleteBoardButton).click();
    await this.page.getByTestId(this.deleteBoardConfirmButton).click();
  }

  async deleteClosedBoard() {
    await this.page.getByRole('button', { name: this.viewAllClosedBoardsButtonName }).click();
    await this.page.getByTestId(this.deleteBoardButton).first().click();
    await this.page.getByTestId(this.deleteBoardConfirmButton).click();
  }

  async validateVisibilityOfBoard(boardName: string, shouldBeVisible: boolean): Promise<void> {
    const boardSelector = this.getBoardInWorkspacesSelector(boardName);
    await this.page.waitForSelector(boardSelector, { state: shouldBeVisible ? 'visible' : 'hidden' });
    const isBoardVisible = await this.page.locator(boardSelector).first().isVisible();
    expect(isBoardVisible).toBe(shouldBeVisible);
  }

  async backBoardToDashboard() {
    await this.page.getByRole('link', { name: this.backToHomeLinkName }).click();
  }

  async isBoardVisible(boardName: string): Promise<boolean> {
    try {
      const boardSelector = this.getBoardInWorkspacesSelector(boardName);
      await this.page.waitForSelector(boardSelector, { 
        state: 'visible', 
        timeout: 5000 
      });
      return await this.page.locator(boardSelector).first().isVisible();
    } catch (error) {
      return false;
    }
  }
}