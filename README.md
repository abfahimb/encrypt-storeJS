# encrypt-storejs (Protected by Secret Key)

**Encrypt-storejs** is a lightweight JavaScript library designed for securely storing data in the browser's local storage. By leveraging advanced encryption techniques, it ensures that sensitive information remains safe from unauthorized access.


For data encryption, encrypt-storejs automatically handles the complexities of encryption and decryption, allowing you to focus on building features

## Table of Contents

- [Description](#description)
- [Why You Need This Package](#why-you-need-this-package)
- [Where You Can Use It](#where-you-can-use-it)
- [How to Use](#how-to-use)
  - [Installation](#installation)
  - [Basic Usage](#basic-usage)
  - [Advanced Usage](#advanced-usage)
- [More Example (Javascript)](#more-example-javascript) 
- [More Example (Typescript)](#more-example-typescript) 
- [How to Contribute](#how-to-contribute)
- [License](#license)

## Description

`encrypt-storejs` simplifies the process of encrypting and storing data in local storage, making it a robust solution for modern web applications that prioritize security. With a straightforward API, developers can easily integrate secure storage solutions without sacrificing usability.

## Why You Need This Package

In today's digital landscape, protecting user data is paramount. Local storage is often exploited by malicious actors to gain access to sensitive information. `encrypt-storejs` provides a seamless way to secure data storage in the browser, helping to prevent data breaches and enhancing user trust in your application.

## Where You Can Use It

- Single-page applications (SPAs) where sensitive user data is stored locally.
- Applications that require secure user authentication and session management.
- Any web application that needs to maintain user preferences or configurations securely.

## How to Use

### Installation

To get started, install the package using npm or yarn:

#### Using NPM

```bash
npm install encrypt-storejs
```
#### Using Yarn 
```bash
yarn add encrypt-storejs
```

### Basic Usage

#### Setup Store

 ``StoreName`` -> on which name you want create your store
 
  ``private_key`` -> Secure Key, Share here from your env or other secure place
```bash
import { EncryptStoreJS } from "encrypt-storejs"

const secureStorage = EncryptStoreJS.init('storeName', 'private_key')
```
#### Set Value
```bash
secureStorage.setEncryptStore({user_name: 'abdullah'})
```
##### [after each update/ insert data it will update] Your localStore will store data something like below (as encrypted it will not similar for you)
```bash
UHzDpCrDicOQd1XCssKMw5F0w60OLsK3WDvDqTnDgcOBBQ7Do8Kew4R/w6oGMcKzSznDpjTCjMOCRlzCqMKSwoQ3wr0DM8K0TDvCvXrDiMOMRl/CoMOdwoo5w7oHPMK7TzvCvXrDjcOGQVXCqcKWw4tbw7gHPMK7TzfDpDfDgcKGWg==
```

#### Update Value
```bash
  secureStorage.updateEncryptStore({user_name:'Ab'})
```

#### Get Value (single)
```bash
   secureStorage.getEncryptStore('name')
```

#### Get Values (full object)
```bash
   secureStorage.getEncryptStore()
```
#### Remove Single Item (array)
```bash
   secureStorage.deleteEncryptStore(['user_name'])
```

#### Clear Store
```bash
    secureStorage.clearEncryptStore()
```

### Advanced Usage

#### With Typescipt 

 ``myStorageKey`` -> on which name you want create your store
 
  ``private_key`` -> Generate One , Share here from your env or other secure place
  
```base
interface UserData {
    token: string
    preferences: {
        theme: string
        language: string
    }
}

const secureStorage = EncryptStore.init<UserData>('myStorageKey', 'private_key')
```
### make more store if you want 
```base 
const userStorage = SecureLocalStorage.init<UserData>('userStorageKey', 'userPassword')
userStorage.setLocalStorageObject({ name: 'Alice', age: 30 })
const userData = userStorage.getLocalStorageObject()
console.log(userData) // { name: 'Alice', age: 30 }

// For ProductData
const productStorage = SecureLocalStorage.init<ProductData>('productStorageKey', 'productPassword')
productStorage.setLocalStorageObject({ productId: '123', productName: 'Widget', price: 9.99 })
const productData = productStorage.getLocalStorageObject()
console.log(productData)
```
## More Example (Javascript)
#### I have create a store.js File
```base 
import { EncryptStoreJS } from "encrypt-storejs"

const secureStorage = EncryptStoreJS.init('storeName', 'private_key')

export function setObject(value) {
  secureStorage.setEncryptStore(value)
}

export function updateObject(updates) {
  secureStorage.updateEncryptStore(updates)
}

export function getObject(field) {
  const result = secureStorage.getEncryptStore(field)
  
  if (typeof result === 'string') {
    return result
  }
  return result
}

export function deleteFields(fields) {
  secureStorage.deleteEncryptStore(fields)
}

export function clearObject() {
  secureStorage.clearEncryptStore()
}
```
#### what ever place needed just import that function 
```base
    const updateAb = () => {
        updateObject({user_name:'abdullah al fahim'})

        const data = getObject('user_name')
        console.log(data)
    }
```    
    
## More Example (Typescript)
#### I have create a store.ts File
```base
import { EncryptStoreJS } from "encrypt-storejs"

interface UserData {
  name?: string
  info?: string
  email?: string
}
const secureStorage = EncryptStoreJS.init<UserData>('myStorageKey', 'private_key')

export function setObject<T extends UserData>(value: T): void {
  secureStorage.setEncryptStore(value)
}

export function updateObject<T extends UserData>(updates: Partial<T>): void {
  secureStorage.updateEncryptStore(updates)
}

export function getObject(field?: keyof UserData): UserData | string | null {
  const result = secureStorage.getEncryptStore(field)
  
  if (typeof result === 'string') {
    return result
  }
  return result as UserData | null
}

export function deleteFields(fields: Array<keyof UserData>): void {
  secureStorage.deleteEncryptStore(fields)
}

export function clearObject(): void {
  secureStorage.clearEncryptStore()
}

```

#### what ever place needed just import that function (for typescript) same
```base
    const updateAb = () => {
        updateObject({user_name:'abdullah al fahim'})

        const data = getObject('user_name')
        console.log(data)
    }
```   

### How to Contribute

This project exists thanks to all the people who contribute.

Please give us a star to support us. Thank you.

### License
```base
MIT License

Copyright (c) 2024 Abdullah Al Fahim

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```