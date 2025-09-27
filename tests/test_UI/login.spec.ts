import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { config, validateConfig } from '../../utils/config';
import users from '../../data/users.json';
import appConfig from '../../app-config.json';

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

test.describe('Login Tests - Todos los usuarios (users.json + app-config.json)', () => {

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

// Inicia el TC de login
  for (const userCase of allTestUsers) {
    test(`${userCase.description} - ${userCase.id}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      
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

      // 4. Esperar un momento para que procese
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