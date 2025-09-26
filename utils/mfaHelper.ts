import * as speakeasy from 'speakeasy';
import appConfig from '../app-config.json';

/**
 * Helper para generar códigos MFA automáticamente usando TOTP
 */
export class MfaHelper {
  
  /**
   * Genera un código MFA de 6 dígitos usando el secret de app-config.json
   * @returns Código MFA de 6 dígitos
   */
  static generateMfaCode(): string {
    if (!appConfig.trello.mfa) {
      throw new Error('MFA secret not found in app-config.json');
    }

    const token = speakeasy.totp({
      secret: appConfig.trello.mfa,
      encoding: 'base32',
      digits: 6,
      step: 30,
      window: 1
    });

    return token;
  }

  /**
   * Verifica si un código MFA es válido (formato)
   */
  static isValidMfaCode(code: string): boolean {
    return /^\d{6}$/.test(code);
  }

  /**
   * Obtiene el código MFA actual
   */
  static async getCurrentMfaCode(): Promise<string> {
    const code = this.generateMfaCode();
    
    if (!this.isValidMfaCode(code)) {
      throw new Error(`Invalid MFA code format: ${code}. Expected 6 digits.`);
    }
    
    console.log(`🔐 Generated MFA code: ${code}`);
    return code;
  }
}