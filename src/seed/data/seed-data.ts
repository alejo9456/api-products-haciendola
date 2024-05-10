import * as bcrypt from 'bcrypt';

import { readProductsFromExcel } from './readProductsFromExcel';


export interface ExcelData {
    Handle: string;
    Title: string;
    Description: string;
    SKU: any;
    Grams: any;
    Stock: any;
    Price: any;
    'Compare Price': any;
    Barcode: any;
}

export interface SeedProduct {
    handle: string,
    title: string,
    description: string,
    sku: string,
    grams: number,
    stock: number,
    price: number,
    compare_price: number,
    barcode?: string,
    userId:string
}

interface SeedUser {
    email:    string;
    fullname: string;
    password: string;
    roles:     string[];
}

interface SeedData {
    users: SeedUser[];
    products: SeedProduct[];
}


export const initialData: SeedData = {

    users: [
        {
            email: 'existinguser@haciendola.com',
            fullname: 'Existing User',
            password: bcrypt.hashSync( 'Password123', 10 ),
            roles: ['admin']
        },
        {
            email: 'existinguser2@haciendola.com',
            fullname: 'Existing User',
            password: bcrypt.hashSync( 'Password123', 10 ),
            roles: ['user','super']
        }
    ],

    products: [],
};

(async () => {
    try {
        const filePath = 'products_data.xlsx';
        
        const productsData = await readProductsFromExcel(filePath);
        
        initialData.products = productsData;
        
    } catch (error) {
        console.error('Error al leer y asignar datos de productos:', error);
    }
})();