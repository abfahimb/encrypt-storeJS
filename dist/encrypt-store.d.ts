/*! encrypt-storejs v2.1.1 | MIT (c) 2024 Abdullah Al Fahim | https://github.com/abfahimb/encrypt-storeJS */
export interface AppData {
    [key: string]: any;
}
export declare class EncryptStoreJS<T extends AppData> {
    private static instance;
    private key;
    private storageKey;
    private constructor();
    static init<T extends AppData>(storageKey: string, password: string): EncryptStoreJS<T>;
    private generateRandomSalt;
    private expandKey;
    private xorEncryptDecrypt;
    private encodeToBase64;
    private decodeFromBase64;
    encryptData(data: string): string;
    decryptData(encryptedData: string): string;
    setEncryptStore(value: T): void;
    updateEncryptStore(updates: Partial<T>): void;
    deleteEncryptStore(fields: Array<keyof T>): void;
    getEncryptStore(field?: keyof T): T | null;
    clearEncryptStore(): void;
}
