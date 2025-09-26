import { Page, Locator, expect } from '@playwright/test';
import { config } from '../utils/config';

export class LoginPage {
  private page: Page;
  
  // Selectores principales
  private inputEmail = '[data-testid="username"]';
  private inputPassword = '[data-testid="password"]'; 
  private continueButton  = '[data-testid="login-submit-idf-testid"]';
  constructor(page: Page) {
    this.page = page;
  }

  async gotoLogin() {
    await this.page.goto(config.urls.login);
  }

  async fillCredentials(email: string, password: string) {
    await this.page.fill(this.inputEmail, email);
    await this.page.click(this.continueButton);
    
    // Esperar a que aparezca el campo de password o un mensaje de error
    try {
      await this.page.waitForSelector(this.inputPassword, { timeout: 5000 });
      await this.page.fill(this.inputPassword, password);
    } catch (error) {
      // Si no aparece el campo de password, puede ser por email inválido
      console.log('⚠️  Password field not found - possibly invalid email');
      // No lanzamos error aquí, dejamos que la validación posterior lo maneje
    }
  }

  async submit() {
    try {
      await this.page.click(this.continueButton, { timeout: 5000 });
    } catch (error) {
      console.log('⚠️  Submit button not found or not clickable');
      // No lanzamos error aquí, dejamos que la validación posterior lo maneje
    }
  }

  // Método para completar MFA (Multi-Factor Authentication)
  async completeMfa(mfaCode: string) {
    console.log('🔐 Completing MFA verification...');
    
    try {
      // Selector específico para el campo MFA de Trello/Atlassian
      const mfaSelector = '#two-step-verification-otp-code-input';
      
      // Esperar a que aparezca el campo MFA
      await this.page.waitForSelector(mfaSelector, { timeout: 5000 });
      
      // Llenar el código MFA (se valida automáticamente)
      await this.page.fill(mfaSelector, mfaCode);
      console.log('✅ MFA code entered - validating automatically...');
      
      // Esperar un momento para que se procese la validación automática
      await this.page.waitForTimeout(3000);
      console.log('🔐 MFA validation completed');
      
    } catch (error) {
      console.log('❌ MFA completion failed:', error);
      throw error;
    }
  }

  // Método para verificar si hay algún error visible
  async hasAnyError(): Promise<boolean> {
    // Buscar por el selector específico del error de login
    const specificError = await this.page.locator('[data-testid="form-error"]').count();
    
    // Buscar por texto de error genérico como fallback
    const genericErrors = await this.page.locator('text=/required|error|invalid|incorrect/i').count();
    
    return specificError > 0 || genericErrors > 0;
  }

  // Método adicional para obtener el mensaje de error específico
  async getErrorMessage(): Promise<string> {
    const errorElement = this.page.locator('[data-testid="form-error--content"]');
    if (await errorElement.isVisible()) {
      return await errorElement.textContent() || '';
    }
    return '';
  }

  // Método para validar login
  async validateLogin(isValidUser: boolean, userCase: any) {
    console.log(`🔍 Validating ${isValidUser ? 'successful' : 'failed'} login...`);
    
    if (isValidUser) {
      // Esperar a que la navegación se complete después del login exitoso
      await this.page.waitForURL('**/boards**', { timeout: 15000 });
      const currentUrl = this.page.url();
      console.log('SUCCESS: URL contains "boards"');
      console.log(`Final URL: ${currentUrl}`);
      expect(currentUrl).toContain('boards');
    } else {
      // Para login fallido, esperar a que aparezca el error o verificar que no hay redirección
      try {
        // Esperar un poco para ver si aparece algún error
        await this.page.waitForTimeout(2000);
        
        // Verificar si hay errores visibles
        const hasError = await this.hasAnyError();
        const currentUrl = this.page.url();
        
        if (hasError || !currentUrl.includes('boards')) {
          console.log('LOGIN FAILED CORRECTLY: Did not redirect to boards');
          console.log(`Current URL: ${currentUrl}`);
          expect(currentUrl).not.toContain('boards');
        } else {
          console.log('UNEXPECTED: Invalid user was redirected to boards');
          expect(currentUrl).not.toContain('boards');
        }
      } catch (error) {
        // Si hay timeout o error, asumimos que el login falló correctamente
        const currentUrl = this.page.url();
        console.log('LOGIN FAILED CORRECTLY: No redirection occurred');
        console.log(`Current URL: ${currentUrl}`);
        expect(currentUrl).not.toContain('boards');
      }
    }
  }
}