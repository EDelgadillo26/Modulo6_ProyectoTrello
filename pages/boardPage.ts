import { Page, Locator, expect } from "@playwright/test";
import { config } from "../utils/config";
import { TrelloDataGenerator } from "../utils/trelloDataGenerator";

export class BoardPage {
  private page: Page;
  

  constructor(page: Page) {
    this.page = page;
  }

  // ========== BOARD AND LIST CREATION METHODS ==========
  async createList(cardName: string){
    await this.page.getByTestId('list-name-textarea').waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByTestId('list-name-textarea').click();
    await this.page.getByTestId('list-name-textarea').fill('To Do');
    await this.page.waitForTimeout(500);
    
    await this.page.getByTestId('list-composer-add-list-button').click();
    await this.page.waitForTimeout(1000); // Esperar a que se cree la lista
    
    await this.page.getByRole('textbox', { name: 'Enter list name…' }).fill('In Progress');
    await this.page.waitForTimeout(500);
    
    await this.page.getByTestId('list-composer-add-list-button').click();
    await this.page.waitForTimeout(1000); // Esperar a que se cree la lista
    
    await this.page.getByRole('textbox', { name: 'Enter list name…' }).fill('Done');
    await this.page.waitForTimeout(500);
    
    await this.page.getByTestId('list-composer-add-list-button').click();
    await this.page.waitForTimeout(1000); // Esperar a que se cree la lista
    
    await this.page.getByTestId('list-composer-cancel-button').click();
    await this.page.waitForTimeout(1000); // Esperar a que se termine la creación
  }

  // ========== CARD CREATION METHODS ==========
  async createCard(cardName: string){
    await this.page.getByRole('button', { name: 'Add a card in To Do' }).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByRole('button', { name: 'Add a card in To Do' }).click();
    await this.page.waitForTimeout(1000); // Esperar a que aparezca el textarea
    
    await this.page.getByTestId('list-card-composer-textarea').fill(cardName);
    await this.page.waitForTimeout(500);
    
    await this.page.getByTestId('list-card-composer-add-card-button').click();
    await this.page.waitForTimeout(2000); // Esperar a que se cree la tarjeta
  }

  async createCardInList(cardName: string, listName: string){
    await this.page.getByRole('button', { name: `Add a card in ${listName}` }).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByRole('button', { name: `Add a card in ${listName}` }).click();
    await this.page.waitForTimeout(1000); // Esperar a que aparezca el textarea
    
    await this.page.getByTestId('list-card-composer-textarea').fill(cardName);
    await this.page.waitForTimeout(500);
    
    await this.page.getByTestId('list-card-composer-add-card-button').click();
    await this.page.waitForTimeout(2000); // Esperar a que se cree la tarjeta
  }

  // ========== BASIC CARD EDITING METHODS ==========
  async editCard(cardName: string){
    await this.page.getByTestId('card-name').click();
    await this.page.getByTestId('card-back-title-input').click();
    await this.page.getByTestId('card-back-title-input').click();
    await this.page.getByTestId('card-back-title-input').fill(cardName);
  }

  async addCardLabels(cardName: string){
    await this.page.getByTestId('card-name').click();
    await this.page.getByTestId('card-back-add-to-card-button').click();
    await this.page.getByTestId('card-back-labels-button').click();
    await this.page.locator('.ZAcH7Pr9TT7uUR > svg').first().click();
  }

  async moveCardToDoing(cardName: string){
    await this.page.getByRole('link', { name: cardName }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByTestId('card-back-name').getByRole('button', { name: 'To Do' }).click();
    await this.page.getByTestId('move-card-popover-select-list-destination-select--input-container').click();
    await this.page.getByTestId('move-card-popover-select-list-destination-select--option-1').getByText('In Progress').click();
    await this.page.getByTestId('move-card-popover-move-button').click();
    await this.page.getByRole('button', { name: 'Close dialog' }).click();
  }

  async moveCardToDone(cardName: string){
    await this.page.getByRole('link', { name: cardName }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByTestId('card-back-name').getByRole('button', { name: 'In Progress' }).click();
    await this.page.getByTestId('move-card-popover-select-list-destination-select--input-container').click();
    await this.page.getByTestId('move-card-popover-select-list-destination-select--option-2').getByText('Done').click();
    await this.page.getByTestId('move-card-popover-move-button').click();
    await this.page.getByRole('button', { name: 'Close dialog' }).click();
  }

  async archiveCard(cardName: string){
    await this.page.getByRole('link', { name: cardName }).click();
    await this.page.getByTestId('card-back-actions-button').click();
    await this.page.getByTestId('card-back-archive-button').click();
    await this.page.getByRole('button', { name: 'Close dialog' }).click();

  }

  async deleteCard(cardName: string){
    await this.page.getByRole('link', { name: cardName }).click();
    await this.page.getByTestId('card-back-actions-button').click();
    await this.page.getByTestId('card-back-archive-button').click();
    await this.page.getByTestId('card-back-delete-card-button').click();
    await this.page.getByTestId('popover-confirm-button').click();
  }

  async validateCardInNotVisible(cardName: string){
    // Verificar que la card no esté visible en el board después del archive
    const cardLocator = this.page.getByRole('link', { name: cardName });
    await expect(cardLocator).not.toBeVisible();
  }
}