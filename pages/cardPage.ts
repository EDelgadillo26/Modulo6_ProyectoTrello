import { Page, Locator, expect } from "@playwright/test";
import { config } from "../utils/config";
import { TrelloDataGenerator } from "../utils/trelloDataGenerator";

export class CardPage {
  private page: Page;
  

  constructor(page: Page) {
    this.page = page;
  }

  // ========== SETUP METHODS ==========
  async createBasicListsAndCard(){
    await this.page.getByTestId('list-name-textarea').waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByTestId('list-name-textarea').click();
    await this.page.getByTestId('list-name-textarea').fill('To Do');
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

  // ========== CARD FUNCTIONALITY METHODS ==========
  async addCardDate(cardName: string){
    await this.page.getByRole('link', { name: cardName }).click();
    await this.page.getByTestId('card-back-add-to-card-button').waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByTestId('card-back-add-to-card-button').click();
    await this.page.getByTestId('card-back-due-date-button').click();
    await this.page.getByRole('button', { name: '25, Thursday September' }).click();
    await this.page.getByRole('button', { name: '10, Friday October' }).click();
    await this.page.getByRole('group', { name: 'Start date' }).locator('svg').click();
    await this.page.getByTestId('due-reminder-select-select--dropdown-indicator').click();
    await this.page.getByTestId('due-reminder-select-select--option-7').getByText('Day before').click();
    await this.page.getByTestId('save-date-button').click();
  }

  async addCardChecklist(cardName: string){
    await this.page.getByRole('link', { name: cardName }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByTestId('card-back-add-to-card-button').waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByTestId('card-back-add-to-card-button').click();
    await this.page.waitForTimeout(1000);
    await this.page.getByTestId('card-back-checklist-button').click();
    await this.page.waitForTimeout(1000);
    await this.page.getByTestId('checklist-add-button').click();
    await this.page.waitForTimeout(1000);
    await this.page.getByTestId('check-item-name-input').waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByTestId('check-item-name-input').click();
    await this.page.getByTestId('check-item-name-input').fill('TEST1');
    await this.page.getByTestId('check-item-add-button').click();
    await this.page.waitForTimeout(500);
    await this.page.getByTestId('check-item-name-input').fill('TEST2');
    await this.page.getByTestId('check-item-add-button').click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('listitem').filter({ hasText: 'TEST1' }).getByTestId('clickable-checkbox').locator('svg').click();
    await this.page.waitForTimeout(500);
  }

  async addCardFilesImage(cardName: string){
    // Usar un selector más genérico para encontrar la tarjeta
    await this.page.getByRole('link', { name: cardName }).click();
    await this.page.waitForTimeout(2000); // Esperar a que se abra la tarjeta

    await this.page.getByTestId('card-back-add-to-card-button').waitFor({ state: 'visible', timeout: 10000 });
    
    await this.page.getByTestId('card-back-add-to-card-button').click();
    await this.page.waitForTimeout(1000); // Esperar a que se abra el menú
    
    await this.page.getByTestId('card-back-attachment-button').click();
    await this.page.waitForTimeout(1000); // Esperar a que se abra el diálogo
    
    // Usar el input file directamente
    await this.page.locator('input[type="file"]').setInputFiles('./data/ImageTest.jpeg');
    
    // Reducir timeout y usar waitForSelector para confirmar subida
    await this.page.waitForTimeout(2000); // Reducir de 5000 a 2000
    
    console.log(`✅ File uploaded successfully!`);
  }

  async addCardFilesJson(cardName: string){
    // Usar un selector más genérico para encontrar la tarjeta
    await this.page.getByRole('link', { name: cardName }).click();
    await this.page.waitForTimeout(2000); // Esperar a que se abra la tarjeta
  
    await this.page.getByTestId('card-back-add-to-card-button').waitFor({ state: 'visible', timeout: 10000 });
    
    await this.page.getByTestId('card-back-add-to-card-button').click();
    await this.page.waitForTimeout(1000); // Esperar a que se abra el menú
    
    await this.page.getByTestId('card-back-attachment-button').click();
    await this.page.waitForTimeout(1000); // Esperar a que se abra el diálogo
    
    // Usar el input file directamente
    await this.page.locator('input[type="file"]').setInputFiles('./data/users.json');
    
    // Reducir timeout y usar waitForSelector para confirmar subida
    await this.page.waitForTimeout(2000); // Reducir de 5000 a 2000
    
    console.log(`✅ File uploaded successfully!`);
  }

  // ========== VALIDATION METHODS ==========
  async validateUploadedFile(){
    await this.page.getByRole('heading', { name: 'Files' }).waitFor({ state: 'visible', timeout: 10000 });
    expect(this.page.getByRole('heading', { name: 'Files' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Close dialog' }).click();
  }

  async validateCardDate(){
    expect(this.page.getByRole('heading', { name: 'Dates' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Close dialog' }).click();
  }

  async validateCardChecklist(){
    expect(this.page.getByTestId('checklist-title')).toBeVisible();
    await this.page.getByRole('button', { name: 'Close dialog' }).click();
  }

  async validateCompleteCard(){
    // Validar que la card tenga todas las funcionalidades
    await expect(this.page.getByRole('heading', { name: 'Files' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Dates' })).toBeVisible();
    await expect(this.page.getByTestId('checklist-title')).toBeVisible();
    
    await this.page.getByRole('button', { name: 'Close dialog' }).click();
    console.log(`✅ Complete card validation successful!`);
  }
  
  async closeCardDetails(){
    await this.page.getByRole('button', { name: 'Close dialog' }).click();
  }
}