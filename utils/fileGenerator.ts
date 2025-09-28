import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { faker } from '@faker-js/faker';

export class FileGenerator {
  private static readonly TEMP_DIR = './temp_files';

  static {
    // Crear directorio temporal si no existe
    if (!existsSync(this.TEMP_DIR)) {
      mkdirSync(this.TEMP_DIR, { recursive: true });
    }
  }

  /**
   * Genera una imagen PNG simple (1x1 pixel)
   */
  static generateSimpleImage(filename?: string): string {
    const fileName = filename || `${faker.system.fileName({ extensionCount: 0 })}.png`;
    const filePath = join(this.TEMP_DIR, fileName);
    
    // PNG mínimo de 1x1 pixel (transparent)
    const pngData = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
      0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4,
      0x89, 0x00, 0x00, 0x00, 0x0B, 0x49, 0x44, 0x41,
      0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00,
      0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE,
      0x42, 0x60, 0x82
    ]);
    
    writeFileSync(filePath, pngData);
    console.log(`📷 Generated image: ${filePath}`);
    return filePath;
  }

  /**
   * Genera un archivo de texto con contenido aleatorio
   */
  static generateTextFile(filename?: string): string {
    const fileName = filename || `${faker.system.fileName({ extensionCount: 0 })}.txt`;
    const filePath = join(this.TEMP_DIR, fileName);
    
    const content = [
      faker.lorem.paragraph(3),
      '',
      `Created: ${new Date().toISOString()}`,
      `Author: ${faker.person.fullName()}`,
      `Project: ${faker.company.buzzPhrase()}`
    ].join('\n');
    
    writeFileSync(filePath, content, 'utf8');
    console.log(`📄 Generated text file: ${filePath}`);
    return filePath;
  }

  /**
   * Genera un archivo JSON con datos aleatorios
   */
  static generateJsonFile(filename?: string): string {
    const fileName = filename || `${faker.system.fileName({ extensionCount: 0 })}.json`;
    const filePath = join(this.TEMP_DIR, fileName);
    
    const jsonData = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      website: faker.internet.url(),
      description: faker.lorem.paragraph(),
      createdAt: faker.date.recent().toISOString(),
      tags: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => faker.hacker.noun())
    };
    
    writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
    console.log(`📋 Generated JSON file: ${filePath}`);
    return filePath;
  }

  /**
   * Genera un archivo CSV con datos aleatorios
   */
  static generateCsvFile(filename?: string, rows: number = 10): string {
    const fileName = filename || `${faker.system.fileName({ extensionCount: 0 })}.csv`;
    const filePath = join(this.TEMP_DIR, fileName);
    
    const headers = ['Name', 'Email', 'Company', 'Phone', 'City'];
    const csvRows = [headers.join(',')];
    
    for (let i = 0; i < rows; i++) {
      const row = [
        faker.person.fullName(),
        faker.internet.email(),
        faker.company.name(),
        faker.phone.number(),
        faker.location.city()
      ].map(field => `"${field}"`);
      
      csvRows.push(row.join(','));
    }
    
    writeFileSync(filePath, csvRows.join('\n'), 'utf8');
    console.log(`📊 Generated CSV file: ${filePath} (${rows} rows)`);
    return filePath;
  }

  /**
   * Obtiene una lista de tipos de archivo soportados
   */
  static getRandomFileType(): 'image' | 'text' | 'json' | 'csv' {
    return faker.helpers.arrayElement(['image', 'text', 'json', 'csv']);
  }

  /**
   * Genera un archivo aleatorio de cualquier tipo
   */
  static generateRandomFile(): string {
    const fileType = this.getRandomFileType();
    
    switch (fileType) {
      case 'image':
        return this.generateSimpleImage();
      case 'text':
        return this.generateTextFile();
      case 'json':
        return this.generateJsonFile();
      case 'csv':
        return this.generateCsvFile();
      default:
        return this.generateTextFile();
    }
  }
}