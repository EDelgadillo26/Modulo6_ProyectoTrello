import { Page, Locator, expect } from "@playwright/test";
import { config } from "../utils/config";
import { TrelloDataGenerator } from "../utils/trelloDataGenerator";

export class BoardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ========== BOARD AND LIST CREATION METHODS ==========
  /**
   * Create standard lists (To Do, In Progress, Done) with proper verification
   */
  async createList(cardName: string) {
    // Wait for and interact with list name textarea
    const listNameTextarea = this.page.getByTestId('list-name-textarea');
    await listNameTextarea.waitFor({ state: 'visible', timeout: 15000 });
    await expect(listNameTextarea).toBeVisible();
    await listNameTextarea.click();
    await listNameTextarea.fill('To Do');
    await this.page.waitForTimeout(500);
    
    // Add To Do list
    const addListButton = this.page.getByTestId('list-composer-add-list-button');
    await addListButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(addListButton).toBeVisible();
    await addListButton.click();
    await this.page.waitForTimeout(1000);
    
    // Add In Progress list
    const enterListNameTextbox = this.page.getByRole('textbox', { name: 'Enter list name…' });
    await enterListNameTextbox.waitFor({ state: 'visible', timeout: 10000 });
    await expect(enterListNameTextbox).toBeVisible();
    await enterListNameTextbox.fill('In Progress');
    await this.page.waitForTimeout(500);
    
    await expect(addListButton).toBeVisible();
    await addListButton.click();
    await this.page.waitForTimeout(1000);
    
    // Add Done list
    await expect(enterListNameTextbox).toBeVisible();
    await enterListNameTextbox.fill('Done');
    await this.page.waitForTimeout(500);
    
    await expect(addListButton).toBeVisible();
    await addListButton.click();
    await this.page.waitForTimeout(1000);
    
    // Close list creation
    const cancelButton = this.page.getByTestId('list-composer-cancel-button');
    await cancelButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cancelButton).toBeVisible();
    await cancelButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Edit board name with verification
   */
  async editBoardName(newBoardName: string) {
    const boardNameDisplay = this.page.getByTestId('board-name-display');
    await boardNameDisplay.waitFor({ state: 'visible', timeout: 10000 });
    await expect(boardNameDisplay).toBeVisible();
    await boardNameDisplay.click();
    
    const boardNameInput = this.page.getByTestId('board-name-input');
    await boardNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await expect(boardNameInput).toBeVisible();
    await boardNameInput.fill(newBoardName);
    await boardNameInput.press('Enter');
  }

  /**
   * Validate board name change
   */
  async validateBoardName(newBoardName: string) {
    const boardNameLocator = this.page.getByTestId('board-name-display');
    await boardNameLocator.waitFor({ state: 'visible', timeout: 10000 });
    await expect(boardNameLocator).toHaveText(newBoardName);
  }

  /**
   * Open inbox menu with verification
   */
  async openInboxMenu() {
    const inboxButton = this.page.getByTestId('panel-nav-inbox-button');
    await inboxButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(inboxButton).toBeVisible();
    await inboxButton.click();
  }

  /**
   * Validate inbox menu is open
   */
  async validateOpenInboxMenu() {
    const inboxHeader = this.page.getByTestId('inbox-header').getByText('Inbox');
    await inboxHeader.waitFor({ state: 'visible', timeout: 15000 });
    await expect(inboxHeader).toBeVisible();
  }

  /**
   * Open planner menu with verification
   */
  async openPlannerMenu() {
    const plannerButton = this.page.getByTestId('panel-nav-planner-button');
    await plannerButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(plannerButton).toBeVisible();
    await plannerButton.click();
  }

  /**
   * Validate planner menu is open
   */
  async validateOpenPlannerMenu() {
    const plannerHeading = this.page.getByRole('heading', { name: 'Planner' });
    await plannerHeading.waitFor({ state: 'visible', timeout: 15000 });
    await expect(plannerHeading).toBeVisible();
  }
  // ========== CARD CREATION METHODS ==========
  /**
   * Create a card in the To Do list with verification
   */
  async createCard(cardName: string) {
    const addCardButton = this.page.getByRole('button', { name: 'Add a card in To Do' });
    await addCardButton.waitFor({ state: 'visible', timeout: 15000 });
    await expect(addCardButton).toBeVisible();
    await addCardButton.click();
    await this.page.waitForTimeout(1000);
    
    const cardTextarea = this.page.getByTestId('list-card-composer-textarea');
    await cardTextarea.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cardTextarea).toBeVisible();
    await cardTextarea.fill(cardName);
    await this.page.waitForTimeout(500);
    
    const addCardSubmitButton = this.page.getByTestId('list-card-composer-add-card-button');
    await addCardSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(addCardSubmitButton).toBeVisible();
    await addCardSubmitButton.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * Create a card in a specific list with verification
   */
  async createCardInList(cardName: string, listName: string) {
    const addCardInListButton = this.page.getByRole('button', { name: `Add a card in ${listName}` });
    await addCardInListButton.waitFor({ state: 'visible', timeout: 15000 });
    await expect(addCardInListButton).toBeVisible();
    await addCardInListButton.click();
    await this.page.waitForTimeout(1000);
    
    const cardTextarea = this.page.getByTestId('list-card-composer-textarea');
    await cardTextarea.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cardTextarea).toBeVisible();
    await cardTextarea.fill(cardName);
    await this.page.waitForTimeout(500);
    
    const addCardSubmitButton = this.page.getByTestId('list-card-composer-add-card-button');
    await addCardSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(addCardSubmitButton).toBeVisible();
    await addCardSubmitButton.click();
    await this.page.waitForTimeout(2000);
  }

  // ========== BASIC CARD EDITING METHODS ==========
  /**
   * Edit card name with verification
   */
  async editCard(cardName: string) {
    const cardNameElement = this.page.getByTestId('card-name');
    await cardNameElement.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cardNameElement).toBeVisible();
    await cardNameElement.click();
    
    const cardTitleInput = this.page.getByTestId('card-back-title-input');
    await cardTitleInput.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cardTitleInput).toBeVisible();
    await cardTitleInput.click();
    await cardTitleInput.fill(cardName);
  }

  /**
   * Add labels to card with verification
   */
  async addCardLabels(cardName: string) {
    const cardNameElement = this.page.getByTestId('card-name');
    await cardNameElement.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cardNameElement).toBeVisible();
    await cardNameElement.click();
    
    const addToCardButton = this.page.getByTestId('card-back-add-to-card-button');
    await addToCardButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(addToCardButton).toBeVisible();
    await addToCardButton.click();
    
    const labelsButton = this.page.getByTestId('card-back-labels-button');
    await labelsButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(labelsButton).toBeVisible();
    await labelsButton.click();
    
    const firstLabel = this.page.locator('.ZAcH7Pr9TT7uUR > svg').first();
    await firstLabel.waitFor({ state: 'visible', timeout: 10000 });
    await expect(firstLabel).toBeVisible();
    await firstLabel.click();
  }

  /**
   * Move card from To Do to In Progress with verification
   */
  async moveCardToDoing(cardName: string) {
    const cardLink = this.page.getByRole('link', { name: cardName });
    await cardLink.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cardLink).toBeVisible();
    await cardLink.click();
    await this.page.waitForTimeout(1000);
    
    const listButton = this.page.getByTestId('card-back-name').getByRole('button', { name: 'To Do' });
    await listButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(listButton).toBeVisible();
    await listButton.click();
    
    const destinationSelect = this.page.getByTestId('move-card-popover-select-list-destination-select--input-container');
    await destinationSelect.waitFor({ state: 'visible', timeout: 10000 });
    await expect(destinationSelect).toBeVisible();
    await destinationSelect.click();
    
    const inProgressOption = this.page.getByTestId('move-card-popover-select-list-destination-select--option-1').getByText('In Progress');
    await inProgressOption.waitFor({ state: 'visible', timeout: 10000 });
    await expect(inProgressOption).toBeVisible();
    await inProgressOption.click();
    
    const moveButton = this.page.getByTestId('move-card-popover-move-button');
    await moveButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(moveButton).toBeVisible();
    await moveButton.click();
    
    const closeButton = this.page.getByRole('button', { name: 'Close dialog' });
    await closeButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(closeButton).toBeVisible();
    await closeButton.click();
  }

  /**
   * Move card from In Progress to Done with verification
   */
  async moveCardToDone(cardName: string) {
    const cardLink = this.page.getByRole('link', { name: cardName });
    await cardLink.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cardLink).toBeVisible();
    await cardLink.click();
    await this.page.waitForTimeout(1000);
    
    const listButton = this.page.getByTestId('card-back-name').getByRole('button', { name: 'In Progress' });
    await listButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(listButton).toBeVisible();
    await listButton.click();
    
    const destinationSelect = this.page.getByTestId('move-card-popover-select-list-destination-select--input-container');
    await destinationSelect.waitFor({ state: 'visible', timeout: 10000 });
    await expect(destinationSelect).toBeVisible();
    await destinationSelect.click();
    
    const doneOption = this.page.getByTestId('move-card-popover-select-list-destination-select--option-2').getByText('Done');
    await doneOption.waitFor({ state: 'visible', timeout: 10000 });
    await expect(doneOption).toBeVisible();
    await doneOption.click();
    
    const moveButton = this.page.getByTestId('move-card-popover-move-button');
    await moveButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(moveButton).toBeVisible();
    await moveButton.click();
    
    const closeButton = this.page.getByRole('button', { name: 'Close dialog' });
    await closeButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(closeButton).toBeVisible();
    await closeButton.click();
  }

  /**
   * Archive card with verification
   */
  async archiveCard(cardName: string) {
    const cardLink = this.page.getByRole('link', { name: cardName });
    await cardLink.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cardLink).toBeVisible();
    await cardLink.click();
    
    const actionsButton = this.page.getByTestId('card-back-actions-button');
    await actionsButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(actionsButton).toBeVisible();
    await actionsButton.click();
    
    const archiveButton = this.page.getByTestId('card-back-archive-button');
    await archiveButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(archiveButton).toBeVisible();
    await archiveButton.click();
    
    const closeButton = this.page.getByRole('button', { name: 'Close dialog' });
    await closeButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(closeButton).toBeVisible();
    await closeButton.click();
  }

  /**
   * Delete card completely with verification
   */
  async deleteCard(cardName: string) {
    const cardLink = this.page.getByRole('link', { name: cardName });
    await cardLink.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cardLink).toBeVisible();
    await cardLink.click();
    
    const actionsButton = this.page.getByTestId('card-back-actions-button');
    await actionsButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(actionsButton).toBeVisible();
    await actionsButton.click();
    
    const archiveButton = this.page.getByTestId('card-back-archive-button');
    await archiveButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(archiveButton).toBeVisible();
    await archiveButton.click();
    
    const deleteCardButton = this.page.getByTestId('card-back-delete-card-button');
    await deleteCardButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(deleteCardButton).toBeVisible();
    await deleteCardButton.click();
    
    const confirmButton = this.page.getByTestId('popover-confirm-button');
    await confirmButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();
  }

  /**
   * Validate that card is not visible (after archive/delete)
   */
  async validateCardInNotVisible(cardName: string) {
    // Wait a moment for the operation to complete
    await this.page.waitForTimeout(2000);
    
    const cardLocator = this.page.getByRole('link', { name: cardName });
    await expect(cardLocator).not.toBeVisible();
  }
}