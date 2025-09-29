import { Page, Locator, expect } from "@playwright/test";
import { config } from "../utils/config";
import { TrelloDataGenerator } from "../utils/trelloDataGenerator";

export class CardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ========== SETUP METHODS ==========
  /**
   * Create basic To Do list for testing card functionalities
   */
  async createBasicListsAndCard() {
    const listNameTextarea = this.page.getByTestId('list-name-textarea');
    await listNameTextarea.waitFor({ state: 'visible', timeout: 15000 });
    await expect(listNameTextarea).toBeVisible();
    await listNameTextarea.click();
    await listNameTextarea.fill('To Do');
    await this.page.waitForTimeout(500);
    
    const addListButton = this.page.getByTestId('list-composer-add-list-button');
    await addListButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(addListButton).toBeVisible();
    await addListButton.click();
    await this.page.waitForTimeout(1000);
    
    const cancelButton = this.page.getByTestId('list-composer-cancel-button');
    await cancelButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cancelButton).toBeVisible();
    await cancelButton.click();
    await this.page.waitForTimeout(1000);
  }

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

  // ========== CARD FUNCTIONALITY METHODS ==========
  /**
   * Add due date to card with verification
   */
  async addCardDate(cardName: string) {
    const cardLink = this.page.getByRole('link', { name: cardName });
    await cardLink.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cardLink).toBeVisible();
    await cardLink.click();
    
    const addToCardButton = this.page.getByTestId('card-back-add-to-card-button');
    await addToCardButton.waitFor({ state: 'visible', timeout: 15000 });
    await expect(addToCardButton).toBeVisible();
    await addToCardButton.click();
    
    const dueDateButton = this.page.getByTestId('card-back-due-date-button');
    await dueDateButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(dueDateButton).toBeVisible();
    await dueDateButton.click();
    
    const dateButton1 = this.page.getByRole('button', { name: '25, Thursday September' });
    await dateButton1.waitFor({ state: 'visible', timeout: 10000 });
    await expect(dateButton1).toBeVisible();
    await dateButton1.click();
    
    const dateButton2 = this.page.getByRole('button', { name: '10, Friday October' });
    await dateButton2.waitFor({ state: 'visible', timeout: 10000 });
    await expect(dateButton2).toBeVisible();
    await dateButton2.click();
    
    const startDateGroup = this.page.getByRole('group', { name: 'Start date' });
    await startDateGroup.waitFor({ state: 'visible', timeout: 10000 });
    await expect(startDateGroup).toBeVisible();
    await startDateGroup.locator('svg').click();
    
    const reminderDropdown = this.page.getByTestId('due-reminder-select-select--dropdown-indicator');
    await reminderDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await expect(reminderDropdown).toBeVisible();
    await reminderDropdown.click();
    
    const dayBeforeOption = this.page.getByTestId('due-reminder-select-select--option-7').getByText('Day before');
    await dayBeforeOption.waitFor({ state: 'visible', timeout: 10000 });
    await expect(dayBeforeOption).toBeVisible();
    await dayBeforeOption.click();
    
    const saveDateButton = this.page.getByTestId('save-date-button');
    await saveDateButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(saveDateButton).toBeVisible();
    await saveDateButton.click();
  }

  /**
   * Add checklist to card with verification
   */
  async addCardChecklist(cardName: string) {
    const cardLink = this.page.getByRole('link', { name: cardName });
    await cardLink.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cardLink).toBeVisible();
    await cardLink.click();
    await this.page.waitForTimeout(2000);
    
    const addToCardButton = this.page.getByTestId('card-back-add-to-card-button');
    await addToCardButton.waitFor({ state: 'visible', timeout: 15000 });
    await expect(addToCardButton).toBeVisible();
    await addToCardButton.click();
    await this.page.waitForTimeout(1000);
    
    const checklistButton = this.page.getByTestId('card-back-checklist-button');
    await checklistButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(checklistButton).toBeVisible();
    await checklistButton.click();
    await this.page.waitForTimeout(1000);
    
    const checklistAddButton = this.page.getByTestId('checklist-add-button');
    await checklistAddButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(checklistAddButton).toBeVisible();
    await checklistAddButton.click();
    await this.page.waitForTimeout(1000);
    
    const checkItemInput = this.page.getByTestId('check-item-name-input');
    await checkItemInput.waitFor({ state: 'visible', timeout: 15000 });
    await expect(checkItemInput).toBeVisible();
    await checkItemInput.click();
    await checkItemInput.fill('TEST1');
    
    const checkItemAddButton = this.page.getByTestId('check-item-add-button');
    await checkItemAddButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(checkItemAddButton).toBeVisible();
    await checkItemAddButton.click();
    await this.page.waitForTimeout(500);
    
    await expect(checkItemInput).toBeVisible();
    await checkItemInput.fill('TEST2');
    await expect(checkItemAddButton).toBeVisible();
    await checkItemAddButton.click();
    await this.page.waitForTimeout(1000);
    
    const checkboxItem1 = this.page.getByRole('listitem').filter({ hasText: 'TEST1' }).getByTestId('clickable-checkbox').locator('svg');
    await checkboxItem1.waitFor({ state: 'visible', timeout: 10000 });
    await expect(checkboxItem1).toBeVisible();
    await checkboxItem1.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Add image file to card with verification
   */
  async addCardFilesImage(cardName: string) {
    const cardLink = this.page.getByRole('link', { name: cardName });
    await cardLink.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cardLink).toBeVisible();
    await cardLink.click();
    await this.page.waitForTimeout(2000);

    const addToCardButton = this.page.getByTestId('card-back-add-to-card-button');
    await addToCardButton.waitFor({ state: 'visible', timeout: 15000 });
    await expect(addToCardButton).toBeVisible();
    await addToCardButton.click();
    await this.page.waitForTimeout(1000);
    
    const attachmentButton = this.page.getByTestId('card-back-attachment-button');
    await attachmentButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(attachmentButton).toBeVisible();
    await attachmentButton.click();
    await this.page.waitForTimeout(1000);
    
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.waitFor({ state: 'attached', timeout: 10000 });
    await fileInput.setInputFiles('./data/ImageTest.jpeg');
    await this.page.waitForTimeout(2000);
    
    console.log(`✅ Image file uploaded successfully!`);
  }

  /**
   * Add JSON file to card with verification
   */
  async addCardFilesJson(cardName: string) {
    const cardLink = this.page.getByRole('link', { name: cardName });
    await cardLink.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cardLink).toBeVisible();
    await cardLink.click();
    await this.page.waitForTimeout(2000);
  
    const addToCardButton = this.page.getByTestId('card-back-add-to-card-button');
    await addToCardButton.waitFor({ state: 'visible', timeout: 15000 });
    await expect(addToCardButton).toBeVisible();
    await addToCardButton.click();
    await this.page.waitForTimeout(1000);
    
    const attachmentButton = this.page.getByTestId('card-back-attachment-button');
    await attachmentButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(attachmentButton).toBeVisible();
    await attachmentButton.click();
    await this.page.waitForTimeout(1000);
    
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.waitFor({ state: 'attached', timeout: 10000 });
    await fileInput.setInputFiles('./data/users.json');
    await this.page.waitForTimeout(2000);
    
    console.log(`✅ JSON file uploaded successfully!`);
  }

  /**
   * Add labels to card with verification
   */
  async addLabelsToCard(cardName: string) {
    const cardLink = this.page.getByRole('link', { name: cardName });
    await cardLink.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cardLink).toBeVisible();
    await cardLink.click();
    
    const addToCardButton = this.page.getByTestId('card-back-add-to-card-button');
    await addToCardButton.waitFor({ state: 'visible', timeout: 15000 });
    await expect(addToCardButton).toBeVisible();
    await addToCardButton.click();
    
    const labelsButton = this.page.getByTestId('card-back-labels-button');
    await labelsButton.waitFor({ state: 'visible', timeout: 15000 });
    await expect(labelsButton).toBeVisible();
    await labelsButton.click();
    
    const greenLabel = this.page.locator('.QAbIzaY_2ICVlA.llQZ8KQKbYje7j.jbjVH3uLtIZCZ5 > .I1mTB4BD1hFm9_ > .ZAcH7Pr9TT7uUR > svg').first();
    await greenLabel.waitFor({ state: 'visible', timeout: 10000 });
    await expect(greenLabel).toBeVisible();
    await greenLabel.click();
    
    const closePopoverButton = this.page.getByRole('button', { name: 'Close popover' });
    await closePopoverButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(closePopoverButton).toBeVisible();
    await closePopoverButton.click();
  }

  // ========== VALIDATION METHODS ==========
  /**
   * Validate that file was uploaded successfully
   */
  async validateUploadedFile() {
    const filesHeading = this.page.getByRole('heading', { name: 'Files' });
    await filesHeading.waitFor({ state: 'visible', timeout: 15000 });
    await expect(filesHeading).toBeVisible();
    
    const closeButton = this.page.getByRole('button', { name: 'Close dialog' });
    await closeButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(closeButton).toBeVisible();
    await closeButton.click();
  }

  /**
   * Validate that card has due date
   */
  async validateCardDate() {
    const datesHeading = this.page.getByRole('heading', { name: 'Dates' });
    await datesHeading.waitFor({ state: 'visible', timeout: 10000 });
    await expect(datesHeading).toBeVisible();
    
    const closeButton = this.page.getByRole('button', { name: 'Close dialog' });
    await closeButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(closeButton).toBeVisible();
    await closeButton.click();
  }

  /**
   * Validate that card has checklist
   */
  async validateCardChecklist() {
    const checklistTitle = this.page.getByTestId('checklist-title');
    await checklistTitle.waitFor({ state: 'visible', timeout: 10000 });
    await expect(checklistTitle).toBeVisible();
    
    const closeButton = this.page.getByRole('button', { name: 'Close dialog' });
    await closeButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(closeButton).toBeVisible();
    await closeButton.click();
  }

  /**
   * Validate that card has labels
   */
  async validateCardLabels() {
    const labelsHeading = this.page.getByRole('heading', { name: 'Labels' });
    await labelsHeading.waitFor({ state: 'visible', timeout: 10000 });
    await expect(labelsHeading).toBeVisible();
    
    const closeButton = this.page.getByRole('button', { name: 'Close dialog' });
    await closeButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(closeButton).toBeVisible();
    await closeButton.click();
  }

  /**
   * Validate that card has all features (complete card)
   */
  async validateCompleteCard() {
    // Validate files
    const filesHeading = this.page.getByRole('heading', { name: 'Files' });
    await filesHeading.waitFor({ state: 'visible', timeout: 10000 });
    await expect(filesHeading).toBeVisible();
    
    // Validate dates
    const datesHeading = this.page.getByRole('heading', { name: 'Dates' });
    await datesHeading.waitFor({ state: 'visible', timeout: 10000 });
    await expect(datesHeading).toBeVisible();
    
    // Validate checklist
    const checklistTitle = this.page.getByTestId('checklist-title');
    await checklistTitle.waitFor({ state: 'visible', timeout: 10000 });
    await expect(checklistTitle).toBeVisible();
    
    const closeButton = this.page.getByRole('button', { name: 'Close dialog' });
    await closeButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    
    console.log(`✅ Complete card validation successful!`);
  }
  
  /**
   * Close card details dialog
   */
  async closeCardDetails() {
    const closeButton = this.page.getByRole('button', { name: 'Close dialog' });
    await closeButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(closeButton).toBeVisible();
    await closeButton.click();
  }
}