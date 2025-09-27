import { Page, Locator, expect } from "@playwright/test";
import { config } from "../utils/config";

export class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
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
    await this.page.locator(`a[title="${boardName}"]`).first().click();
  }
//archive board
  async closeBoard() {
  await this.page.getByRole('button', { name: 'Show menu' }).click();
  await this.page.getByRole('button', { name: 'Close board Close board' }).click();
  await this.page.getByTestId('popover-close-board-confirm').click();
  }
//archive and delete board
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
  await this.page.getByTestId('close-board-delete-board-button').click();
  await this.page.getByTestId('close-board-delete-board-confirm-button').click();

  }

  async validateVisibilityOfBoard(boardName: string, shouldBeVisible: boolean): Promise<void> {
    await this.page.waitForSelector(`h3.xtkiiaSp5ulDJM:has-text("YOUR WORKSPACES") ~ * .JeWt7esCgw4_73 a[title="${boardName}"][aria-label="${boardName}"]`, { state: shouldBeVisible ? 'visible' : 'hidden' });
    const isBoardVisible = await this.page.locator(`h3.xtkiiaSp5ulDJM:has-text("YOUR WORKSPACES") ~ * .JeWt7esCgw4_73 a[title="${boardName}"][aria-label="${boardName}"]`).first().isVisible();
    expect(isBoardVisible).toBe(shouldBeVisible);
  }

  async backBoardToDashboard() {
        await this.page.getByRole('link', { name: 'Back to home' }).click();

  }

  // Method to check if board is visible (without assertions)
  async isBoardVisible(boardName: string): Promise<boolean> {
    await this.page.waitForSelector(`h3.xtkiiaSp5ulDJM:has-text("YOUR WORKSPACES") ~ * .JeWt7esCgw4_73 a[title="${boardName}"][aria-label="${boardName}"]`, { state: 'visible' });
    return await this.page.locator(`h3.xtkiiaSp5ulDJM:has-text("YOUR WORKSPACES") ~ * .JeWt7esCgw4_73 a[title="${boardName}"][aria-label="${boardName}"]`).first().isVisible();
  }
}