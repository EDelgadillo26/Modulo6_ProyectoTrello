# Proyecto Final - Automatización de Pruebas con Playwright

## Estructura del Proyecto

```
ProyectoFinal/
├── tests/
│   ├── test_UI/              # Pruebas de Interfaz de Usuario
│   │   ├── login.spec.ts     # Tests de login (sin autenticación previa)
│   │   ├── dashboard.spec.ts # Tests del dashboard (con autenticación)
│   │   └── authenticated.spec.ts # Otros tests autenticados
│   └── test_API/             # Pruebas de API (futuro)
├── pages/                    # Page Object Models
│   ├── loginPage.ts
│   └── dashboardPage.ts
├── utils/                    # Utilidades y configuraciones
│   ├── config.ts
│   ├── auth.ts
│   ├── global-setup.ts
│   └── mfaHelper.ts
├── data/                     # Datos de prueba
│   └── users.json
├── playwright.config.ts      # Configuración principal de Playwright
└── package.json
```

## Scripts Disponibles

```bash
# Ejecutar todos los tests
npm test

# Ejecutar solo tests de login
npm run test:login

# Ejecutar solo tests autenticados  
npm run test:auth

# Ejecutar solo tests de UI
npm run test:ui-only

# Ejecutar tests con interfaz gráfica
npm run test:ui

# Ejecutar en modo debug
npm run test:debug

# Ver reporte HTML
npm run report
```

## Configuración de Proyectos

El proyecto está configurado con dos tipos de tests:

1. **login-tests**: Tests que no requieren autenticación previa
2. **authenticated-tests**: Tests que usan el estado de autenticación global

## Instalación y Configuración

```bash
# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install --with-deps

# Ejecutar setup global de autenticación
npm test
```
