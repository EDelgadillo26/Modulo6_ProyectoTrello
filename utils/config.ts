import appConfig from '../app-config.json';

/**
 * Configuración específica de la aplicación trello
 * Cargada desde app-config.json en lugar de .env
 */
export const config = {
  // URLs completas de la aplicación
  urls: {
    base: appConfig.trello.baseUrl,
    login: `${appConfig.trello.baseUrl}/login`,
    dashboard: `${appConfig.trello.baseUrl}#/dashboard`,
    clients: `${appConfig.trello.baseUrl}#/clients`,
    products: `${appConfig.trello.baseUrl}#/products`,
    config: `${appConfig.trello.baseUrl}#/settings/import_export`
  },

  // Credenciales de usuario para testing
  user: {
    email: appConfig.trello.email,
    password: appConfig.trello.password,
  },

  // Configuración del navegador
  browser: {
    // el headless se define en playwright.config.ts
  },

  // Datos de prueba específicos de la aplicación
  testData: {
    // Aquí puedes agregar datos de prueba específicos
    // como nombres de clientes, productos, etc.
  }
};

// Validar que las variables críticas están definidas
export const validateConfig = () => {
  const requiredVars = [
    { key: 'email', value: config.user.email },
    { key: 'password', value: config.user.password },
    { key: 'baseUrl', value: config.urls.base },
  ];

  const missing = requiredVars.filter(({ value }) => !value);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required configuration: ${missing.map(({ key }) => key).join(', ')}\n` +
      'Please check your app-config.json file'
    );
  }
  
  console.log('All required configuration is set');
  return true;
};

// Exportar como default también para mayor flexibilidad
export default config;
