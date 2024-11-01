/*! encrypt-storejs v1.0.5 | MIT (c) 2024 Abdullah Al Fahim | https://github.com/abfahimb/encrypt-storeJS */

export interface AppData {
  [key: string]: any;
}

export class EncryptStoreJS<T extends AppData> {
  private static instance: EncryptStoreJS<any>;
  private key: string;
  private storageKey: string;

  private constructor(storageKey: string, password: string) {
      this.storageKey = storageKey;
      this.key = password;
  }

  public static init<T extends AppData>(storageKey: string, password: string): EncryptStoreJS<T> {
      if (!EncryptStoreJS.instance) {
        EncryptStoreJS.instance = new EncryptStoreJS<T>(storageKey, password);
      } else {
          console.warn('SecureLocalStorage has already been initialized. Please create a new instance for different settings.');
      }
      return EncryptStoreJS.instance as EncryptStoreJS<T>;
  }

  private generateRandomSalt(length: number = 16): string {
      const randomBytes = new Uint8Array(length);
      window.crypto.getRandomValues(randomBytes);
      return Array.from(randomBytes, byte => String.fromCharCode(byte)).join('');
  }

  private expandKey(key: string, salt: string): string {
      const expandedKey: string[] = [];
      for (let i = 0; i < Math.max(key.length, salt.length); i++) {
          const keyChar = key.charCodeAt(i % key.length);
          const saltChar = salt.charCodeAt(i % salt.length);
          expandedKey.push(String.fromCharCode(keyChar ^ saltChar));
      }
      return expandedKey.join('');
  }

  private xorEncryptDecrypt(data: string): string {
      const salt = this.generateRandomSalt();
      const expandedKey = this.expandKey(this.key, salt);
      let result = '';

      for (let i = 0; i < data.length; i++) {
          result += String.fromCharCode(data.charCodeAt(i) ^ expandedKey.charCodeAt(i % expandedKey.length));
      }

      return this.encodeToBase64(salt + result);
  }

  private encodeToBase64(data: string): string {
      try {
          return btoa(unescape(encodeURIComponent(data)));
      } catch (error) {
          this.clearEncryptStore();
          throw error;
      }
  }

  private decodeFromBase64(data: string): string {
      try {
          return decodeURIComponent(escape(atob(data)));
      } catch (error) {
          this.clearEncryptStore();
          throw error;
      }
  }

  public encryptData(data: string): string {
      return this.xorEncryptDecrypt(data);
  }

  public decryptData(encryptedData: string): string {
      const decoded = this.decodeFromBase64(encryptedData);
      const salt = decoded.substring(0, 16);
      const encryptedMessage = decoded.substring(16);
      const expandedKey = this.expandKey(this.key, salt);
      let result = '';

      for (let i = 0; i < encryptedMessage.length; i++) {
          result += String.fromCharCode(encryptedMessage.charCodeAt(i) ^ expandedKey.charCodeAt(i % expandedKey.length));
      }

      return result;
  }

  public setEncryptStore(value: T): void {
      if (typeof value === 'object' && value !== null) {
          const encodedData = this.encryptData(JSON.stringify(value));
          if (typeof window !== 'undefined') {
              localStorage.setItem(this.storageKey, encodedData);
          }
      } else {
          console.error('Value must be an object');
      }
  }

  public updateEncryptStore(updates: Partial<T>): void {
      if (typeof window !== 'undefined') {
          const encodedData = localStorage.getItem(this.storageKey);
          const storedData = encodedData ? JSON.parse(this.decryptData(encodedData)) as T : {};

          if (typeof updates === 'object' && updates !== null) {
              const updatedData = { ...storedData, ...updates };
              const newEncodedData = this.encryptData(JSON.stringify(updatedData));
              localStorage.setItem(this.storageKey, newEncodedData);
          } else {
              console.error('Updates must be an object');
          }
      }
  }

  public deleteEncryptStore(fields: Array<keyof T>): void {
      if (typeof window !== 'undefined') {
          const encodedData = localStorage.getItem(this.storageKey);
          const storedData = encodedData ? JSON.parse(this.decryptData(encodedData)) as T : {};

          if (storedData && typeof storedData === 'object') {
              fields.forEach(field =>   delete (storedData as any)[field]);
              const newEncodedData = this.encryptData(JSON.stringify(storedData));
              localStorage.setItem(this.storageKey, newEncodedData);
          } else {
              console.error('Stored data is not an object or does not exist');
          }
      }
  }

  public getEncryptStore(field?: keyof T): T | null {
      if (typeof window !== 'undefined') {
          const encodedData = localStorage.getItem(this.storageKey);
          const parsedData = encodedData ? JSON.parse(this.decryptData(encodedData)) as T : null;

          if (field && parsedData && field in parsedData) {
              return parsedData[field] || null;
          }

          return parsedData;
      }

      return null;
  }

  public clearEncryptStore(): void {
      if (typeof window !== 'undefined') {
          localStorage.removeItem(this.storageKey);
      }
  }
}
