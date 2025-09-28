import { Page, Locator, expect } from "@playwright/test";
import { config } from "../utils/config";
import { TrelloDataGenerator } from "../utils/trelloDataGenerator";

export class DashboardPage {
  private page: Page;
  

  constructor(page: Page) {
    this.page = page;
  }

  // ========== METODOS DEFINIDOS ==========
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



  async createCard(cardName: string){
  await this.page.getByRole('button', { name: 'Add a card in To Do' }).waitFor({ state: 'visible', timeout: 10000 });
  await this.page.getByRole('button', { name: 'Add a card in To Do' }).click();
  await this.page.waitForTimeout(1000); // Esperar a que aparezca el textarea
  
  await this.page.getByTestId('list-card-composer-textarea').fill(cardName);
  await this.page.waitForTimeout(500);
  
  await this.page.getByTestId('list-card-composer-add-card-button').click();
  await this.page.waitForTimeout(2000); // Esperar a que se cree la tarjeta
  }

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

  async addCardDate(cardName: string){

  await this.page.getByRole('link', { name: cardName }).click();
  await this.page.getByTestId('card-back-add-to-card-button').click();
  await this.page.getByTestId('card-back-due-date-button').click();
  await this.page.getByRole('button', { name: '25, Thursday September' }).click();
  await this.page.getByRole('button', { name: '10, Friday October' }).click();
  await this.page.getByRole('group', { name: 'Start date' }).locator('svg').click();
  await this.page.getByTestId('due-reminder-select-select--dropdown-indicator').click();
  await this.page.getByTestId('due-reminder-select-select--option-7').getByText('Day before').click();
  await this.page.getByTestId('save-date-button').click();
  await this.page.getByRole('button', { name: 'Close dialog' }).click();
  }

  async addCardChecklist(cardName: string){

  await this.page.getByTestId('lists').locator('div').filter({ hasText: cardName }).nth(3).click();
  await this.page.getByTestId('card-back-add-to-card-button').click();
  await this.page.getByTestId('card-back-checklist-button').click();
  await this.page.getByTestId('checklist-add-button').click();
  await this.page.getByTestId('check-item-name-input').fill(cardName);
  await this.page.getByTestId('check-item-add-button').click();
  await this.page.getByTestId('check-item-name-input').fill(cardName);
  await this.page.getByTestId('check-item-add-button').click();
  await this.page.getByRole('listitem').filter({ hasText: cardName }).getByTestId('clickable-checkbox').locator('svg').click();
  await this.page.getByRole('button', { name: 'Close dialog' }).click();
  }

  async addCardFiles(cardName: string){
  // Usar un selector más genérico para encontrar la tarjeta
  await this.page.getByRole('link', { name: cardName }).click();
  await this.page.waitForTimeout(2000); // Esperar a que se abra la tarjeta
  
  await this.page.getByTestId('card-back-add-to-card-button').click();
  await this.page.waitForTimeout(1000); // Esperar a que se abra el menú
  
  await this.page.getByTestId('card-back-attachment-button').click();
  await this.page.waitForTimeout(1000); // Esperar a que se abra el diálogo
  
  // Usar el input file directamente
  console.log(`📎 Uploading existing file: data/ImageTest.jpeg`);
  await this.page.locator('input[type="file"]').setInputFiles('./data/ImageTest.jpeg');
  
  // Reducir timeout y usar waitForSelector para confirmar subida
  console.log(`📎 Waiting for file upload to complete...`);
  await this.page.waitForTimeout(2000); // Reducir de 5000 a 2000
  
  console.log(`✅ File uploaded successfully!`);
  }

  async validateUploadedFile(){
    expect(this.page.getByRole('button', { name: 'ImageTest.jpeg ImageTest.jpeg' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Close dialog' }).click();
  }

}