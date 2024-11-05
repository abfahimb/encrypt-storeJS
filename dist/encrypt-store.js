"use strict";
/*! encrypt-storejs v2.1.3 | MIT (c) 2024 Abdullah Al Fahim | https://github.com/abfahimb/encrypt-storeJS */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptStoreJS = void 0;
class EncryptStoreJS {
    constructor(storageKey, password) {
        this.storageKey = storageKey;
        this.key = password;
    }
    static init(storageKey, password) {
        EncryptStoreJS.instance = new EncryptStoreJS(storageKey, password);
        return EncryptStoreJS.instance;
    }
    generateRandomSalt(length = 16) {
        const randomBytes = new Uint8Array(length);
        window.crypto.getRandomValues(randomBytes);
        return Array.from(randomBytes, byte => String.fromCharCode(byte)).join('');
    }
    expandKey(key, salt) {
        const expandedKey = [];
        for (let i = 0; i < Math.max(key.length, salt.length); i++) {
            const keyChar = key.charCodeAt(i % key.length);
            const saltChar = salt.charCodeAt(i % salt.length);
            expandedKey.push(String.fromCharCode(keyChar ^ saltChar));
        }
        return expandedKey.join('');
    }
    xorEncryptDecrypt(data) {
        const salt = this.generateRandomSalt();
        const expandedKey = this.expandKey(this.key, salt);
        let result = '';
        for (let i = 0; i < data.length; i++) {
            result += String.fromCharCode(data.charCodeAt(i) ^ expandedKey.charCodeAt(i % expandedKey.length));
        }
        return this.encodeToBase64(salt + result);
    }
    encodeToBase64(data) {
        try {
            return btoa(unescape(encodeURIComponent(data)));
        }
        catch (error) {
            this.clearEncryptStore();
            throw error;
        }
    }
    decodeFromBase64(data) {
        try {
            return decodeURIComponent(escape(atob(data)));
        }
        catch (error) {
            this.clearEncryptStore();
            throw error;
        }
    }
    encryptData(data) {
        return this.xorEncryptDecrypt(data);
    }
    decryptData(encryptedData) {
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
    setEncryptStore(value) {
        if (typeof value === 'object' && value !== null) {
            const encodedData = this.encryptData(JSON.stringify(value));
            if (typeof window !== 'undefined') {
                localStorage.setItem(this.storageKey, encodedData);
            }
        }
        else {
            console.error('Value must be an object');
        }
    }
    updateEncryptStore(updates) {
        if (typeof window !== 'undefined') {
            const encodedData = localStorage.getItem(this.storageKey);
            const storedData = encodedData ? JSON.parse(this.decryptData(encodedData)) : {};
            if (typeof updates === 'object' && updates !== null) {
                const updatedData = Object.assign(Object.assign({}, storedData), updates);
                const newEncodedData = this.encryptData(JSON.stringify(updatedData));
                localStorage.setItem(this.storageKey, newEncodedData);
            }
            else {
                console.error('Updates must be an object');
            }
        }
    }
    deleteEncryptStore(fields) {
        if (typeof window !== 'undefined') {
            const encodedData = localStorage.getItem(this.storageKey);
            const storedData = encodedData ? JSON.parse(this.decryptData(encodedData)) : {};
            if (storedData && typeof storedData === 'object') {
                fields.forEach(field => delete storedData[field]);
                const newEncodedData = this.encryptData(JSON.stringify(storedData));
                localStorage.setItem(this.storageKey, newEncodedData);
            }
            else {
                console.error('Stored data is not an object or does not exist');
            }
        }
    }
    getEncryptStore(field) {
        if (typeof window !== 'undefined') {
            const encodedData = localStorage.getItem(this.storageKey);
            const parsedData = encodedData ? JSON.parse(this.decryptData(encodedData)) : null;
            if (field && parsedData && field in parsedData) {
                return parsedData[field] || null;
            }
            return parsedData;
        }
        return null;
    }
    clearEncryptStore() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.storageKey);
        }
    }
}
exports.EncryptStoreJS = EncryptStoreJS;
//# sourceMappingURL=encrypt-store.js.map