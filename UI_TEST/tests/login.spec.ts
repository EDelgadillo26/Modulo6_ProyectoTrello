import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { config, validateConfig } from '../utils/config';
import { MfaHelper } from '../utils/mfaHelper';
import users from '../data/users.json';
import appConfig from '../app-config.json';

// Combinamos usuarios de users.json + usuario válido de app-config.json
const allTestUsers = [
  // Usuarios de users.json (todos inválidos)
  ...Object.entries(users).map(([key, userData]) => ({
    id: key,
    email: userData.email,
    password: userData.password,
    description: `Usuario inválido: ${key}`,
    isValid: false
  })),
  // Usuario válido de app-config.json
  {
    id: 'valid_user',
    email: appConfig.trello.email,
    password: appConfig.trello.password,
    description: 'Usuario válido de app-config.json',
    isValid: true
  }
];

test.describe('Authentication Test Suite - Comprehensive Login Validation with Valid and Invalid Credentials', () => {

  test.beforeAll(() => {
    validateConfig();
  });    

  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();

  });

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === 'failed') {
    await page.screenshot({ 
      path: `test-results/failed-${testInfo.title.replace(/\s+/g, '-')}.png` 
    });
  }
});

// Test case generation for comprehensive login validation
  let testCounter = 14; // Starting from TC014
  for (const userCase of allTestUsers) {
    const testId = `TC${testCounter.toString().padStart(3, '0')}`;
    const testName = userCase.isValid 
      ? `${testId} - Verify successful authentication with valid credentials and MFA handling`
      : `${testId} - Verify authentication rejection with invalid credentials (${userCase.id})`;
    
    test(testName, async ({ page }) => {
      const loginPage = new LoginPage(page);
      testCounter++;
      
      console.log(`🧪 Testing user: ${userCase.id}`);
      console.log(`📧 Email: "${userCase.email}"`);
      console.log(`🔐 Password: "${userCase.password}"`);
      console.log(`"?" Expected to be valid: ${userCase.isValid}`);
      
      // 1. Ir a la página de login
    await test.step('Ir a la página de login', async () => {
        await loginPage.gotoLogin();

      });
      
      // 2. Llenar credenciales
    await test.step('Llenar credenciales', async () => {
        await loginPage.fillCredentials(userCase.email, userCase.password);
    });

      // 3. Hacer click en login
    await test.step('Hacer click en login', async () => {
      await loginPage.submit();
    });

      // 4. Manejar MFA si es usuario válido
      if (userCase.isValid) {
        await test.step('Completar MFA (si es necesario)', async () => {
          try {
            // Verificar si aparece el campo MFA
            const mfaSelector = '#two-step-verification-otp-code-input';
            await page.waitForSelector(mfaSelector, { timeout: 5000 });
            
            console.log('🔐 MFA detected - generating code automatically...');
            const mfaCode = MfaHelper.generateMfaCode();
            console.log(`🔐 Generated MFA code: ${mfaCode}`);
            
            await loginPage.completeMfa(mfaCode);
          } catch (error) {
            // Si no hay MFA requerido, continúa normalmente
            console.log('ℹ️  No MFA required for this login');
          }
        });
      }

      // 5. Esperar un momento para que procese
      await test.step('Esperar un momento para que procese', async () => {
        await page.waitForTimeout(3000);
      });
            
      // Validar login usando el método del Page Object
      await test.step('Validar login', async () => {
        await loginPage.validateLogin(userCase.isValid, userCase);
        console.log(`Test completed for user: ${userCase.id}\n`);

      });
    });
  }
});