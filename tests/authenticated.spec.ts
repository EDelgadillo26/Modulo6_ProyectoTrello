import { test, expect } from '@playwright/test';

test.describe('Authenticated Tests - Using Global Authentication', () => {

  test('Should be authenticated and access boards', async ({ page }) => {
    // Ir directamente a la página de boards - ya estamos autenticados globalmente
    await page.goto('https://trello.com/u/pabloenriquedelgadillofernandez2/boards');
    
    // Verificar que estamos autenticados (la URL contiene boards)
    await expect(page).toHaveURL(/.*boards.*/);
    
    // Verificar que podemos ver elementos típicos de un usuario autenticado
    const currentUrl = page.url();
    console.log('✅ Successfully authenticated via global setup');
    console.log(`Current URL: ${currentUrl}`);
    
    // Opcionalmente, verificar que no estamos en una página de login
    expect(currentUrl).not.toContain('login');
    expect(currentUrl).not.toContain('mfa');
  });

  test('Should access Trello homepage when authenticated', async ({ page }) => {
    // Ir a la página principal de Trello
    await page.goto('https://trello.com');
    
    // Esperar un momento para redirección
    await page.waitForTimeout(2000);
    
    const currentUrl = page.url();
    console.log(`Trello homepage URL: ${currentUrl}`);
    
    // Verificar que no nos redirige a login
    expect(currentUrl).not.toContain('login');
    
    console.log('✅ Trello homepage accessible with global authentication');
  });

});